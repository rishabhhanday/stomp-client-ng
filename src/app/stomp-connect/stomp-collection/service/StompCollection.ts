export class StompCollection {
  constructor(
    public connectUrl: string,
    public connectHeaders: string,
    public subscriptions: string,
    public messageHeaders: string,
    public messageBody: string,
    public messageDestination: string
  ) {}
}
