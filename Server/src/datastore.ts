import { Collection, MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const URL = process.env.URL || '';

export class EverythingDatastore {

  tags: Collection;
  collections: Collection;
  pictures: Collection;
 
  


  constructor(client: MongoClient) {


    this.tags = client.db("imageShare").collection('tags');
    this.collections = client.db("imageShare").collection('collections');
    this.pictures = client.db("imageShare").collection('pictures');
    
  }
//connects to mongodb
  static async connect() {
    return new Promise<MongoClient>((resolve, reject) =>
      MongoClient.connect(URL, async (err: Error, client: MongoClient) => {
        if (err) {
          reject(err);
        }
        resolve(client);
      }));
  }

  async readAllTags() {
    return await this.tags.find({}).toArray();
  }

  async readAllPictures() {
    return await this.pictures.find({}).toArray();
  }

  async readAllCollections() {
    return await this.collections.find({}).toArray();
  }



  async readTaggedPictures(tag : string) {
    return await this.pictures.find({tags : tag }).toArray();
  }

  async readTaggedCollections(tag : string) {
    return await this.collections.find({ tags : tag }).toArray();
  }
  
  async readOneTag (nameIn: string) {
   
    return await this.pictures.findOne({name :  nameIn})
    
  }

  async readOnePicture(id: string) {
    return await this.pictures.findOne({_id : new ObjectId(id)})
  }

  async readOneCollection(id: string) {
    
    return await this.collections.findOne({_id : new ObjectId(id)})
      
    
  }

  //Not sure if will implement
  /*
  async deleteTag(id: string) {
    const test = await this.tags.deleteOne({ _id: new ObjectId(id) });
  }*/

  async deletePicture(id: string) {
    await this.collections.updateMany({}, {$pull : {pictures : id}})
    const test = await this.pictures.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteCollection(id: string) {
    const test = await this.pictures.deleteOne({ _id: new ObjectId(id) });
  }


  async updateTag(name: string, updateInfo : any) {
    
    return await this.tags.updateOne({ name : name }, updateInfo);
  }



  async updatePicture(id: ObjectId, updateInfo : any) {
    
    return await this.pictures.updateOne({ _id: id }, updateInfo);
  }

  async updateCollection(id: ObjectId, updateInfo : any) {
    
    return await this.collections.updateOne({ _id: id }, updateInfo);
  }

 async createTag(name: string) {

    var newTag = {
      name : name
    }
    var test = await this.tags.insertOne( newTag );
    return test.ops[0];
  }
  

  
  async createPicture(name: string, user: string, comment: string, picture : Buffer, tags : string[] ) {
    var response : object;
    var newPicture = {
      name : name,
      user : user || "unimplemented",
      comment : comment,
      picture: picture,
      tags : tags
    }
     await this.pictures.insertOne( newPicture, function(error, result){
      if(error) {
        response = { error: true, message: "Error adding data" };
        return response;
      } else {
        response = { error: false, message: "Data added", id: result.insertedId };
        return response;
      }
      
      console.log("ds");
      console.log(response);
     
    });
    

    

  }

  async createCollection(name: string, user: string, comment: string, pictures : String[], tags : string[] ) {

    var newCollection = {
      name : name,
      user : user || "unimplemented",
      comment : comment,
      tags : tags,
      pictures : pictures
    }
    var test = await this.collections.insertOne( newCollection );
    return test.ops[0];
  }


}
