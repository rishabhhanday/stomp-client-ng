import { Component, OnInit } from '@angular/core';
import { MessageDetails } from '../model/MessageDetails';

import { StompService } from '../stomp-service.service';
import { StringBeautify } from '../util/StringBeautifyUtil';

@Component({
  selector: 'app-stomp-response',
  templateUrl: './stomp-response.component.html',
  styleUrls: ['./stomp-response.component.css'],
})
export class StompResponseComponent implements OnInit {
  messageToDisplay: string = '';
  responses: MessageDetails[] = [];

  constructor(private stompService: StompService) {}

  showMessage(messageId: string) {
    const body =
      this.responses.find((stompResponse) => {
        return stompResponse.messageId === messageId;
      })?.body + '';

    this.messageToDisplay = StringBeautify.beautify(body);
  }

  ngOnInit(): void {
    this.stompService.messageRecieved.subscribe(
      (stompResponseMessage: MessageDetails) => {
        this.messageToDisplay = StringBeautify.beautify(
          stompResponseMessage.body
        );

        this.responses.push(stompResponseMessage);
      }
    );

    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.messageToDisplay = '';
      this.responses = [];
    });
  }
}