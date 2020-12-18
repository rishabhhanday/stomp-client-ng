import { Component, OnInit } from '@angular/core';
import { StompService } from '../stomp-service.service';

@Component({
  selector: 'app-stomp-message',
  templateUrl: './stomp-message.component.html',
  styleUrls: ['./stomp-message.component.css'],
})
export class StompMessageComponent implements OnInit {
  destination: string = '';
  messageHeaders: string = '{}';
  messageBody = '{}';
  isConnected: boolean = false;

  constructor(private stompService: StompService) {}

  ngOnInit(): void {
    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });
  }

  publish() {
    const messageHeaders = JSON.parse(this.messageHeaders);
    this.stompService.send(this.destination, messageHeaders, this.messageBody);
  }
}
