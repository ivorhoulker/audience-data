import Category from "../data/categories.json";

export interface Question {
  id: string;
  english: string;
  chinese: string;
  category: typeof Category[number];
  strength: number;
}
