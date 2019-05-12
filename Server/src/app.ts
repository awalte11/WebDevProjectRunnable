import { MongoClient } from "mongodb";
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
