import { Component, OnInit } from '@angular/core';
import { MessageDetails } from '../model/MessageDetails';
import { StompService } from '../stomp-service.service';

@Component({
  selector: 'app-stomp-connect',
  templateUrl: './stomp-connect.component.html',
  styleUrls: ['./stomp-connect.component.css'],
})
export class StompConnectComponent implements OnInit {
  url: string = 'ws://localhost:8080/stomp';
  connectHeaders: string = '{}';
  subscriptions: string = '["/reply/teams"]';
  isConnected: boolean = false;

  constructor(private stompService: StompService) {}

  ngOnInit(): void {
    this.stompService.isConnected.subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });
  }

  connect() {
    const connectHeaders = JSON.parse(this.connectHeaders);
    const subscriptions = JSON.parse(this.subscriptions);

    this.stompService.connect(this.url, connectHeaders, subscriptions);
  }

  disconnect(){
    this.stompService.disconnect();
  }
}
