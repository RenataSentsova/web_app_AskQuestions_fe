export interface Question {
  id: number;
  topic: string;
  text: string;
  modifiedOn: string;
  userId: number;
  subcategoryId: number;
  nbAnswers: number;
  isClosed: string;
}
