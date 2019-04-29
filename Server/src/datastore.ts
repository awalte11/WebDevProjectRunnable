import { Collection, MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGO_CONNECTION || '';

export class ItemsDatastore {
  items: Collection;
  temp: ObjectId;

  constructor(client: MongoClient) {
    this.items = client.db().collection('items');
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
}
