import { EventEmitter, Injectable } from '@angular/core';
import { StompCollection } from '../model/StompCollection';
import * as collectionJson from '../../resources/collection.json';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  collections: any = {};
  constructor() {
    this.collections = (collectionJson as any).default;
    console.log(this.collections);
  }

  stompCollection = new EventEmitter<StompCollection>();

  parseCollection(collection: string): StompCollection {
    const collectionObject = JSON.parse(collection);
    const connect = collectionObject.connect;
    const subscriptions = collectionObject.subscriptions;
    const message = collectionObject.message;

    const stompCollection = new StompCollection(
      connect.url,
      connect.headers,
      subscriptions,
      message.headers,
      message.body,
      message.destination
    );

    console.log(stompCollection);

    return stompCollection;
  }
  emitCollection(stompCollection: StompCollection) {
    this.stompCollection.emit(stompCollection);
  }

  getCollection(collectionName: string): string {
    return JSON.stringify(this.collections[collectionName]);
  }

  getCollectionNames(): string[] {
    return Object.keys(this.collections);
  }

  addCollection(collectionToAdd: string) {
    const collection = JSON.parse(collectionToAdd);

    this.collections[Object.keys(collection)[0]] =
      collection[Object.keys(collection)[0]];
    console.log(this.collections);
  }
}
