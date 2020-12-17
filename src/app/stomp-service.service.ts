import { unescapeIdentifier } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  constructor() {}
  private client: CompatClient | undefined;

  connect(
    url: string,
    connectHeaders: { [key: string]: any },
    subsciptions: string[]
  ) {
    console.log(url, connectHeaders, subsciptions);

    this.client = Stomp.client(url);
    this.client.connect(connectHeaders, () => {
      subsciptions.forEach((subscription) => {
        this.subscribe(subscription);
      });
    });
  }

  subscribe(subscriptionUrl: string) {
    this.client?.subscribe(subscriptionUrl, (response) => {
      console.log(response);
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
    this.client?.disconnect();
  }
}
