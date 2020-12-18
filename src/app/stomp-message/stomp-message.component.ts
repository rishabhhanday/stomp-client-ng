import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../stomp-connect/stomp-collection/service/collection-service.service';
import { StompCollection } from '../stomp-connect/stomp-collection/service/StompCollection';
import { StompService } from '../stomp-service.service';
import { StringBeautify } from '../util/StringBeautifyUtil';

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
        this.messageHeaders = StringBeautify.beautify(
          JSON.stringify(collection.messageHeaders)
        );
        this.messageBody = StringBeautify.beautify(
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
