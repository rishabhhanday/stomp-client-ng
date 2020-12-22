import { Component, OnInit } from '@angular/core';
import { StompCollection } from 'src/app/model/StompCollection';
import { CollectionService } from 'src/app/service/collection-service.service';
import { StompService } from 'src/app/service/stomp-service.service';
import { JSONUtil } from 'src/app/util/JSONUtil';

@Component({
  selector: 'app-stomp-message',
  templateUrl: './stomp-message.component.html',
  styleUrls: ['./stomp-message.component.css'],
})
export class StompMessageComponent implements OnInit {
  destination: string = '';
  messageHeaders: string = '';
  messageBody = '';
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
        this.destination = collection.messageDestination;
        this.messageHeaders = JSONUtil.beautify(
          JSON.stringify(collection.messageHeaders)
        );
        this.messageBody = JSONUtil.beautify(
          JSON.stringify(collection.messageBody)
        );
      }
    );
  }

  publish() {
    const messageHeaders = JSON.parse(this.messageHeaders);
    this.stompService.send(this.destination, messageHeaders, this.messageBody);
  }
}
