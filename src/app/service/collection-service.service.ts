import { EventEmitter, Injectable } from '@angular/core';
import { StompCollection } from '../model/StompCollection';
import * as collectionJson from '../../resources/collection.json';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private LOCAL_STORAGE_SAVED_COLLECTION: string = 'savedCollection';
  collections: any = {};

  constructor() {
    if (localStorage.getItem(this.LOCAL_STORAGE_SAVED_COLLECTION)) {
      this.collections = JSON.parse(
        localStorage.getItem(this.LOCAL_STORAGE_SAVED_COLLECTION)!
      );

      console.log(localStorage.getItem(this.LOCAL_STORAGE_SAVED_COLLECTION));
    } else {
      console.log('local storage collection not found .');
      this.collections = (collectionJson as any).default;

      localStorage.setItem(
        this.LOCAL_STORAGE_SAVED_COLLECTION,
        JSON.stringify(this.collections)
      );
    }
  }

  stompCollection = new EventEmitter<StompCollection>();

  private addCollectionToLocalStorage() {
    localStorage.setItem(
      this.LOCAL_STORAGE_SAVED_COLLECTION,
      JSON.stringify(this.collections)
    );
  }

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

    Object.keys(collection).forEach((collectionName) => {
      this.collections[collectionName] = collection[collectionName];
    });

    this.addCollectionToLocalStorage();
  }
}
