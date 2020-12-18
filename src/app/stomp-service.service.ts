import { Injectable, EventEmitter } from '@angular/core';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { MessageDetails, MessageType } from './model/MessageDetails';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  constructor() {}
  private client: CompatClient | undefined;
  messageRecieved = new EventEmitter<MessageDetails>();
  isConnected = new EventEmitter<boolean>();

  connect(
    url: string,
    connectHeaders: { [key: string]: any },
    subsciptions: string[]
  ) {
    console.log(url, connectHeaders, subsciptions);

    this.client = Stomp.client(url);
    this.client.connect(connectHeaders, () => {
      this.isConnected.emit(true);

      subsciptions.forEach((subscription) => {
        this.subscribe(subscription);
      });
    });
  }

  private createMessageDetails(stompResponse: IMessage): MessageDetails {
    const headers = stompResponse.headers;

    return new MessageDetails(
      headers['message-id'],
      headers['destination'],
      MessageType.RESPONSE,
      stompResponse.body
    );
  }

  subscribe(subscriptionUrl: string) {
    this.client?.subscribe(subscriptionUrl, (response) => {
      this.messageRecieved.emit(this.createMessageDetails(response));
    });
  }

  send(
    destination: string,
    messageHeaders: { [key: string]: any },
    body: string
  ) {
    this.client?.send(destination, messageHeaders, body);
  }

  disconnect() {
    this.client?.disconnect(() => {
      this.isConnected.emit(false);
    });
  }
}
