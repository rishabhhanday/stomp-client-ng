import { Component, OnInit } from '@angular/core';
import { StompCollection } from 'src/app/model/StompCollection';
import { CollectionService } from 'src/app/service/collection-service.service';
import { StompService } from 'src/app/service/stomp-service.service';
import { JSONUtil } from 'src/app/util/JSONUtil';

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

        this.connectHeaders = JSONUtil.beautify(
          JSON.stringify(collection.connectHeaders)
        );
        this.subscriptions = JSONUtil.beautify(
          JSON.stringify(collection.subscriptions)
        );
      }
    );
  }

  connect() {
    const connectHeaders =
      this.connectHeaders === '' ? {} : JSON.parse(this.connectHeaders);
    const subscriptions =
      this.subscriptions === '' ? [] : JSON.parse(this.subscriptions);

    this.stompService.connect(this.url, connectHeaders, subscriptions);
  }

  disconnect() {
    this.stompService.disconnect();
  }
}
