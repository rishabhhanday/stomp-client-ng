import { Component, OnInit } from '@angular/core';
import { MessageDetails } from 'src/app/model/MessageDetails';
import { StompService } from 'src/app/service/stomp-service.service';
import { JSONUtil } from 'src/app/util/JSONUtil';

@Component({
  selector: 'app-stomp-response',
  templateUrl: './stomp-response.component.html',
  styleUrls: ['./stomp-response.component.css'],
})
export class StompResponseComponent implements OnInit {
  messageToDisplay: string = '';
  responses: MessageDetails[] = [];
  destinationToFilter: string = '';

  constructor(private stompService: StompService) {}

  showMessage(messageId: string) {
    this.messageToDisplay = JSONUtil.beautify(
      this.responses.find((response) => response.messageId === messageId)!
        .body + ''
    );
  }

  ngOnInit(): void {
    this.stompService.messageRecieved.subscribe(
      (stompResponseMessage: MessageDetails) => {
        this.messageToDisplay = JSONUtil.beautify(stompResponseMessage.body);

        this.responses.push(stompResponseMessage);
      }
    );

    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.messageToDisplay = '';
      this.responses = [];
    });
  }
}
