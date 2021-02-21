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
    console.log('loading default collection .');
    this.collections = (collectionJson as any).default;

    if (localStorage.getItem(this.LOCAL_STORAGE_SAVED_COLLECTION)) {
      console.log('collection found in localStorage. Please check saved collection to use.');
      this.addCollection(
        localStorage.getItem(this.LOCAL_STORAGE_SAVED_COLLECTION)!
      );
    } else {
      console.log('no collection found in localStorage. Adding default collection to localStorage .')
      this.resetCollectionInLocalStorage();

    }
  }

  stompCollection = new EventEmitter<StompCollection>();

  private resetCollectionInLocalStorage() {
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

    this.resetCollectionInLocalStorage();
  }

  getAllCollections() {
    return this.collections;
  }
}
