import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stomp-response',
  templateUrl: './stomp-response.component.html',
  styleUrls: ['./stomp-response.component.css'],
})
export class StompResponseComponent implements OnInit {
  messageToDisplay: string = '';
  response: { destination: string; messageId: string; message: string }[] = [
    {
      destination: '/client/v1/error',
      messageId: 'Message cannot be delivered, attempt one',
      message: 'this is message one',
    },
    {
      destination: '/client/v1/payment',
      messageId: 'Message cannot be delivered, attempt two',
      message: 'this is message two',
    },
  ];
  constructor() {}

  showMessage(messageId: string) {
    this.messageToDisplay = this.response[0].message;
  }

  ngOnInit(): void {}
}
