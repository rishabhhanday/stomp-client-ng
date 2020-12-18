export class MessageDetails {
  constructor(
    public messageId: string,
    public destination: string,
    public type: MessageType,
    public body: string
  ) {}
}

export enum MessageType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}
