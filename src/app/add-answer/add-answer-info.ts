export class AddAnswerInfo {
  text: string;
  userId: number;
  questionId: number;

  constructor(text: string, userId: number, questionId: number) {
    this.text = text;
    this.userId = userId;
    this.questionId = questionId;
  }
}
