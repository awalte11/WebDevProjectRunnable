import { MongoClient, ObjectId, MongoError } from "mongodb";
import { EverythingDatastore } from "./datastore";
import * as express from 'express';
import * as morgan from 'morgan';
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
  });;
//starts express server
function startServer(everythingDatastore: EverythingDatastore) {
  const app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const port = process.env.PORT || 3000;

  app.get('/api/tags', async (request: Request, response: Response, next) => {
    const tags = await everythingDatastore.readAllTags();
    
    response.json( tags );
  });

  app.get('/api/pictures', async (request: Request, response: Response, next) => {
    const pictures = await everythingDatastore.readAllPictures();
    console.log("getting pictures");
    console.log(pictures.length);
    response.json( pictures );
  });

  app.get('/api/collections', async (request: Request, response: Response, next) => {
    const collections = await everythingDatastore.readAllCollections();
    
    response.json( collections );
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
       else
         response.json({ tag });
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
     var newID;
     try {
       newID = new ObjectId(id)
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
      var newID;
      newID = new ObjectId(id)
      const tag = await everythingDatastore.readOneCollection(newID);
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

  app.post('/api/pictures', async (request, response) => {
    console.log("post");
    const name = request.body.name;  
    const comment = request.body.comment || "";
    const address = request.body.address;  
    const tags = request.body.tags || [];
    if(!name || name == "" )
    {
      response.status(400).json({
            "paramaterName" : "name",
            "paramaterValue" : name,
            "errorText" : "Name must not be null or empty."
        })
    }
    else if(!address || address == "" )
    {
      response.status(400).json({
            "paramaterName" : "address",
            "paramaterValue" : address,
            "errorText" : "address must not be null or empty."
        })
    }
    else {
      
        var out = await everythingDatastore.createPicture(name, comment, address, tags);
        console.log (out._id);
        
        response.status(201).json(
          out

        ) 
         
      
    }
  });  

  app.post('/api/collections', async (request, response) => {
    console.log("post");
    const name = request.body.name;
    const comment = request.body.comment || "";
    const pictures = request.body.pictures || [];
    const tags = request.body.tags || [];
    if(!name || name == "" )
    {
      response.status(400).json({
            "paramaterName" : "name",
            "paramaterValue" : name,
            "errorText" : "Name must not be null or empty."
        })
    }
    else {
      
        var out = await everythingDatastore.createPicture(name, comment, pictures, tags);
        console.log (out._id);
        
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
          console.log(element + "  not found")
          everythingDatastore.createTag(element);
          everythingDatastore.updateTag(element, {$addToSet : {pictures : id  } })
        }
        else
        {
          console.log(element + "   found")
          everythingDatastore.updateTag(element, {$addToSet : {pictures : id  } });
        }
      });
      didsomething = true;
    }

    if (!(!removeTags || removeTags == [] ))
    {
      var tagsToKill = { $pull: { tags : { in : removeTags} }}
      everythingDatastore.updatePicture(id, tagsToKill)
      removeTags.forEach(element => {
        everythingDatastore.updateTag(element, {$pull : {pictures : id  } })

      });
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
    
   

    
  
  
  });

//responds to get requests for all items
  app.get('/test', async (request: Request, response: Response) => {
    //await;
    const items = {};
    response.json({items});
    console.log('GETtest');
  });
//responds to post request
  app.post('/test', async (request: Request, response: Response) => {
      //await;
      response.sendStatus(201);
  });
//responds to patch request
  app.patch('/test/:id', async (request: Request, response: Response) => {
    try{
      const id = request.params.id;
      //await;
      response.sendStatus(204);
    } catch (error) {
      response.status(400).json({
        'parameterName': '',
        'parameterValue': null,
        'errorText': ''
      });
    }
  });
//responds to delete request for single item by id
  app.delete('/test/:id', async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      //await;
      response.sendStatus(204);
    } catch (error) {
      response.sendStatus(400);
    }
  });
//responds to delete request for all items
  app.delete('/test', async (request: Request, response: Response) => {
    try {
      //await;
      response.sendStatus(204);
    } catch (error) {
      response.sendStatus(400);
    }
  });

//listens on port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
