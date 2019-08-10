export class AskInfo {
  topic: string;
  text: string;
  userId: number;
  subcategoryId: number;

  constructor(topic: string, text: string, userId: number, subcategoryId: number) {
    this.topic = topic;
    this.text = text;
    this.userId = userId;
    this.subcategoryId = subcategoryId;
  }
}
