import { Component, OnInit } from '@angular/core';
import { StompService } from 'src/app/stomp-service.service';
import { CollectionService } from './service/collection-service.service';

@Component({
  selector: 'app-stomp-collection',
  templateUrl: './stomp-collection.component.html',
  styleUrls: ['./stomp-collection.component.css'],
})
export class StompCollectionComponent implements OnInit {
  isConnected: boolean = false;
  collection: string = '';
  constructor(
    private stompService: StompService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });
  }

  importCollection() {
    this.collectionService.emitCollection(
      this.collectionService.parseCollection(this.collection)
    );
  }
}
