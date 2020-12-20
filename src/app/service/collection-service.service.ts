import { EventEmitter, Injectable } from '@angular/core';
import { StompCollection } from '../model/StompCollection';
import * as collectionJson from '../../resources/collection.json';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor() {}

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
    return JSON.stringify((collectionJson as any).default[collectionName]);
  }

  getCollectionNames(): string[] {
    return Object.keys((collectionJson as any).default);
  }
}
