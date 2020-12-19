export class StompCollection {
  constructor(
    public connectUrl: string,
    public connectHeaders: any,
    public subscriptions: string[],
    public messageHeaders: any,
    public messageBody: any,
    public messageDestination: string
  ) {}
}
