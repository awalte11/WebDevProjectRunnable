import { MongoClient, ObjectId, MongoError } from "mongodb";
import { EverythingDatastore } from "./datastore";
import * as express from 'express';
//import * as morgan from 'morgan'; //Uncomment when debuging, TS is throwing heisenbugs
import * as cors from 'cors';
import { Request, Response } from 'express';


const bodyParser = require('body-parser');
//Connects to datastore
EverythingDatastore
  .connect()
  .then((client: MongoClient) => {
    const everythingDatastore = new EverythingDatastore(client);
    startServer(everythingDatastore);
    console.log('started');
  })
  .catch(error => {
    console.error("Uh-oh, couldn't connect to Mongo", error);
    process.exit();
  });

//starts express server
function startServer(everythingDatastore: EverythingDatastore) {
  const app = express();

  var port = process.env.PORT || 5000;


//  app.use(morgan('dev'));//Uncomment when debuging, TS is throwing heisenbugs

  app.use(bodyParser.urlencoded({ extended: true, limit : "16mb" }));
  app.use(bodyParser.json({ limit : "16mb" } ));
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb'}));

  
  //listens on port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.use(cors());
  app.options("/*", cors());
  

  app.get('/api/tags',  async (request: Request, response: Response, next) => {
    const tags = await everythingDatastore.readAllTags();
    
    response.json( tags );
  });

  app.get('/api/pictures', async (request: Request, response: Response, next) => {
    var pictures = await everythingDatastore.readAllPictures();
    pictures.forEach(pict => {pict.picture = null});
    console.log("getting pictures");
    console.log(pictures.length);
    response.json( pictures );
  });

  app.get('/api/collections',  async (request: Request, response: Response, next) => {
    const collections = await everythingDatastore.readAllCollections();
    
    response.json( collections );
  });



  app.get('/api/picturesbytag/:name', async (request: Request, response: Response, next) => {
    const name = request.params.name;
    try {
      var pictures = await everythingDatastore.readTaggedPictures(name);
      if (pictures == null)//because *somehow* catch isn't working. damnit js.
        {
          response.status(404).json({
           "paramaterName" : "name",
            "paramaterValue" : name,   
            "errorText" : "No such tag."
           });
       }
       else
       {
        
        pictures.forEach(pict => {pict.picture = null});
        response.json( pictures );
       }
         
      } catch (error) {
      
        response.status(404).json({
          "paramaterName" : "name",
           "paramaterValue" : name,   
           "errorText" : "No such tag."
      });
    }
  });

  app.get('/api/collectionsbytag/:name', async (request: Request, response: Response, next) => {
    const name = request.params.name;
    try {
      const collections = await everythingDatastore.readTaggedCollections(name);
      if (collections == null)//because *somehow* catch isn't working. damnit js.
        {
          response.status(404).json({
           "paramaterName" : "name",
            "paramaterValue" : name,   
            "errorText" : "No such tag."
           });
       }
       else
       {
        

        response.json( collections );
       }
         
      } catch (error) {
      
        response.status(404).json({
          "paramaterName" : "name",
           "paramaterValue" : name,   
           "errorText" : "No such tag."
      });
    }
  });

  app.get('/api/tags/:name', async (request: Request, response: Response, next) => {
    const name = request.params.name;
    try {
      const tag = await everythingDatastore.readOneTag(name);
      if (tag == null)//because *somehow* catch isn't working. damnit js.
        {
          response.status(404).json({
           "paramaterName" : "name",
            "paramaterValue" : name,   
            "errorText" : "No such tag."
           });
       }
       else{
        
        response.json({ tag });
       }
      } catch (error) {
      
        response.status(404).json({
          "paramaterName" : "name",
           "paramaterValue" : name,   
           "errorText" : "No such tag."
      });
    }
  });

  

  app.get('/api/pictures/:id', async (request: Request, response: Response, next) => {
     const id = request.params.id;
     
     try {

       const tag = await everythingDatastore.readOnePicture(id);
      console.log("Tag is :" + tag);
      if (tag == null)//because *somehow* catch isn't working. damnit js.
        {
          response.status(404).json({
           "paramaterName" : "id",
            "paramaterValue" : id,   
            "errorText" : "No picture for this id."
           });
       }
       else
         response.json({ tag });
     }
     catch
     {
      response.status(404).json({
        "paramaterName" : "id",
         "paramaterValue" : id,   
         "errorText" : "Bad Id."
        });
     }
      
      
  });

  app.get('/api/collections/:id', async (request: Request, response: Response, next) => {
    const id = request.params.id;
    try {

      const tag = await everythingDatastore.readOneCollection(id);
      if (tag == null)//because *somehow* catch isn't working. damnit js.
        {
          response.status(404).json({
           "paramaterName" : "id",
            "paramaterValue" : id,   
            "errorText" : "No collection for this id."
           });
       }
       else
         response.json({ tag });
      } catch (error) {
      
        response.status(404).json({
          "paramaterName" : "id",
          "paramaterValue" : id,   
          "errorText" : "No collection for this id."
      });
    }
  });

  app.post('/api/tags', async (request, response) => {
    console.log("post");
    const name = request.body.name;
    if(!name || name == "" )// doing this here to catch empty descriptions
    {
      response.status(400).json({
            "paramaterName" : "name",
            "paramaterValue" : null,
            "errorText" : "name must not be null or empty."
        })
    }
    else {
        const tag = await everythingDatastore.readOneTag(name);
        if ( tag == null  )
        {
          var out = await everythingDatastore.createTag(name);
          console.log (out._id);
        
          response.status(201).json({
            "ID" : out._id,
            "name" : out.name

          }) 
        }
        else {
          response.status(400).json({
            "error" : "tag already exists",
            "name" : name
          }) 
        }
    }
  });

  app.options('/api/pictures', cors());
  app.post('/api/pictures', async (request, response) => {
    console.log("post");
    const name = request.body.name;  
    const user = request.body.user;
    const comment = request.body.comment || "";
    const picture = request.body.picture;  
    const tags : string[] = request.body.tags || [];
    if(!name || name == "" )
    {
      response.status(400).json({
            "paramaterName" : "name",
            "paramaterValue" : name,
            "errorText" : "Name must not be null or empty."
        })
    }
    else if(!picture || picture == "" )
    {
      response.status(400).json({
            "paramaterName" : "picture",
            "paramaterValue" : picture,
            "errorText" : "picture must not be null or empty."
        })
    }
    else {
        var out = await everythingDatastore.createPicture(name, user, comment, picture, tags);
        console.log("app")
        console.log (out);

        tags.forEach(async element => {
          var tagCheck = await everythingDatastore.readOneTag(element);
          console.log(tagCheck);
          if (tagCheck == null)
          {
            everythingDatastore.createTag(element);
          }
        });
        
        response.status(201).json(
          out

        ) 
         
      
    }
  });  

  app.post('/api/collections', async (request, response) => {
    console.log("post collection");
    const name = request.body.name;
    const comment = request.body.comment || "";
    const user = request.body.user;
    const pictures = request.body.pictures || [];
    const tags : string[] = request.body.tags || [];
    if(!name || name == "" )
    {
      response.status(400).json({
            "paramaterName" : "name",
            "paramaterValue" : name,
            "errorText" : "Name must not be null or empty."
        })
    }
    else {
      
        var out = await everythingDatastore.createCollection(name, user, comment, pictures, tags);
        console.log (out._id);
        tags.forEach(async element => {
          var tagCheck = await everythingDatastore.readOneTag(element);
          console.log(tagCheck);
          if (tagCheck == null)
          {
            everythingDatastore.createTag(element);
          }
        });
        
        response.status(201).json({
          "ID" : out._id

        }) 
         
      
    }
  });  

  //patch for tags *does not exist*, tags are never operated on directly.

  /**
   * Things you can modify via request
   * request.body.name to change the name
   * request.body.comment to change the comment
   * request.body.addTags to add tags
   * request.body.removeTags to remove tags
   * the last two should be sent as arrays
   */
  app.patch('/api/pictures/:id', async (request, response) => {
    console.log("Update Start");

    const id = new ObjectId(request.params.id);
    var current = everythingDatastore.readOnePicture(request.params.id);
    if (current == null)
    {
      response.status(404).json({
        "paramaterName" : "id",
         "paramaterValue" : id,   
         "errorText" : "No collection for this id. Somehow"
        });

    }
    else
    {

    
      const nameIn = request.body.name;
      const commentIn = request.body.comment;
      const addTags : string[] = request.body.addTags;
      const removeTags : string[] = request.body.removeTags;
      var didsomething : Boolean = false;
      
      
      

      if (!(!nameIn || nameIn == "" ))
      {
        var nameUpdate = {$set : { name : nameIn}}
        everythingDatastore.updatePicture(id, nameUpdate)
        didsomething = true;
      }
      if (!(!commentIn || commentIn == "" ))
      {
        var commentUpdate = {$set : { comment : commentIn}}
        everythingDatastore.updatePicture(id, commentUpdate)
        didsomething = true;
      }
      if (!(!addTags || addTags == [] ))
      {
        var tagsToAdd = { $addToSet : { tags : { $each : addTags }}}
        everythingDatastore.updatePicture(id, tagsToAdd)
        addTags.forEach(async element => {
          var tagCheck = await everythingDatastore.readOneTag(element);
          console.log(tagCheck);
          if (tagCheck == null)
          {
            everythingDatastore.createTag(element);
          }
        });

        
        didsomething = true;
      }

      if (!(!removeTags || removeTags == [] ))
      {
        console.log(removeTags);
        var tagsToKill = { $pull: { tags : { $in : removeTags} }}
        console.log(tagsToKill);
        everythingDatastore.updatePicture(id, tagsToKill)
        didsomething = true;
      }

      if(!didsomething)
      {
        response.status(400).json({
              "paramaterName" : "all",
              "paramaterValue" : null,
              "errorText" : "Empty Request."
          })
      }
      else response.status(200).send("Updated");
    }
  });

  app.patch('/api/collections/:id', async (request, response) => {
    console.log("Update Start");
    const id = new ObjectId(request.params.id);
    var current = everythingDatastore.readOneCollection(request.params.id);
    if (current == null)
    {
      response.status(404).json({
        "paramaterName" : "id",
         "paramaterValue" : id,   
         "errorText" : "No collection for this id. Somehow"
        });

    }
    else
    {
      const nameIn = request.body.name;
      const commentIn = request.body.comment;
      const addPictures : string[] = request.body.addPictures;
      const removePictures : string[] = request.body.removePictures;
      const addTags : string[] = request.body.addTags;
      const removeTags : string[] = request.body.removeTags;
      var didsomething : Boolean = false;
      
      
      

      if (!(!nameIn || nameIn == "" ))
      {
        var nameUpdate = {$set : { name : nameIn}}
        everythingDatastore.updateCollection(id, nameUpdate)
        didsomething = true;
      }
      if (!(!commentIn || commentIn == "" ))
      {
        var commentUpdate = {$set : { comment : commentIn}}
        everythingDatastore.updateCollection(id, commentUpdate)
        didsomething = true;
      }
      if (!(!addTags || addTags == [] ))
      {
        
        var tagsToAdd = { $addToSet : { tags : { $each : addTags }}}
        everythingDatastore.updateCollection(id, tagsToAdd)
        addTags.forEach(async element => {
          var tagCheck = await everythingDatastore.readOneTag(element);
          console.log(tagCheck);
          if (tagCheck == null)
          {
            everythingDatastore.createTag(element);
          }
        });

        
        didsomething = true;
      }

      if (!(!removeTags || removeTags == [] ))
      {
        var tagsToKill = { $pull: { tags : { $in : removeTags} }};
        everythingDatastore.updateCollection(id, tagsToKill);
        didsomething = true;
      }

      if (!(!addPictures || addPictures == [] ))
      {
        console.log(addPictures);
        var picturesToAdd = { $addToSet : { pictures : { $each : addPictures }}};
        everythingDatastore.updateCollection(id, picturesToAdd);

        didsomething = true;
      }

      if (!(!removePictures || removePictures == [] ))
      {
        var picturesToKill = { $pull: { tags : { $in : removePictures} }};
        everythingDatastore.updateCollection(id, picturesToKill);
        didsomething = true;
      }

      if(!didsomething)
      {
        response.status(400).json({
              "paramaterName" : "all",
              "paramaterValue" : null,
              "errorText" : "Empty Request."
          })
      }
      else response.status(200).send("Updated");
    }

    });

  app.delete('/api/collections/:id', async (request, response) => {
    const id = request.params.id;
    try {
      await everythingDatastore.deleteCollection(id);
      response.sendStatus(204);
    } catch (error) {
            
      response.status(404).json({
        "paramaterName" : "id",
        "paramaterValue" : id,   
        "errorText" : "No collection for this id."
      }).send();
    }
  });

  app.delete('/api/pictures/:id', async (request, response) => {
    const id = request.params.id;
    try {
      await everythingDatastore.deletePicture(id);
      response.sendStatus(204);
    } catch (error) {
            
      response.status(404).json({
        "paramaterName" : "id",
        "paramaterValue" : id,   
        "errorText" : "No picture for this id."
      }).send();
    }
  });

  




}
