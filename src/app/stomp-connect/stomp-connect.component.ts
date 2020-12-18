import { Component, OnInit } from '@angular/core';
import { MessageDetails } from '../model/MessageDetails';
import { StompService } from '../stomp-service.service';
import { StringBeautify } from '../util/StringBeautifyUtil';
import { CollectionService } from './stomp-collection/service/collection-service.service';
import { StompCollection } from './stomp-collection/service/StompCollection';

@Component({
  selector: 'app-stomp-connect',
  templateUrl: './stomp-connect.component.html',
  styleUrls: ['./stomp-connect.component.css'],
})
export class StompConnectComponent implements OnInit {
  url: string = '';
  connectHeaders: string = '';
  subscriptions: string = '';
  isConnected: boolean = false;

  constructor(
    private stompService: StompService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });

    this.collectionService.stompCollection.subscribe(
      (collection: StompCollection) => {
        this.url = collection.connectUrl;

        this.connectHeaders = StringBeautify.beautify(
          JSON.stringify(collection.connectHeaders)
        );
        this.subscriptions = StringBeautify.beautify(
          JSON.stringify(collection.subscriptions)
        );
      }
    );
  }

  connect() {
    const connectHeaders = JSON.parse(this.connectHeaders);
    const subscriptions = JSON.parse(this.subscriptions);

    this.stompService.connect(this.url, connectHeaders, subscriptions);
  }

  disconnect() {
    this.stompService.disconnect();
  }
}
