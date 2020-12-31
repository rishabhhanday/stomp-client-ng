import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/service/collection-service.service';
import { StompService } from 'src/app/service/stomp-service.service';

import { JSONUtil } from 'src/app/util/JSONUtil';

@Component({
  selector: 'app-stomp-collection',
  templateUrl: './stomp-collection.component.html',
  styleUrls: ['./stomp-collection.component.css'],
})
export class StompCollectionComponent implements OnInit {
  isConnected: boolean = false;
  collection: string = '';
  collectionNames: string[] = [];

  constructor(
    private stompService: StompService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.collection = JSONUtil.beautify(
      this.collectionService.getCollection('template')
    );
    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });

    this.collectionNames = this.collectionService.getCollectionNames();
  }

  displayCollection(collectionName: string) {
    this.collection = JSONUtil.beautify(
      this.collectionService.getCollection(collectionName)
    );
  }

  emitCollection() {
    this.collectionService.emitCollection(
      this.collectionService.parseCollection(this.collection)
    );
  }

  importCollection(collection: HTMLTextAreaElement) {
    this.collectionService.addCollection(collection.value);
    this.collectionNames = this.collectionService.getCollectionNames();

    alert(
      'Collection successfully added. Please check saved collection to use.'
    );
  }

  autofillCollection(collectionEl: HTMLTextAreaElement) {
    collectionEl.value = JSONUtil.beautify(
      JSON.stringify(this.collectionService.getAllCollections())
    );
  }
}
