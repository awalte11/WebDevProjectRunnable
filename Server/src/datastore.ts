import { Collection, MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const URL = process.env.URL || '';

export class EverythingDatastore {
  tags: Collection;
  collections: Collection;
  pictures: Collection;
  temp: ObjectId;

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
}
