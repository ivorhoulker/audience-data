import Category from "../data/categories-v3.json";

export interface Question {
  id: string;
  english: string;
  chinese: string;
  category: typeof Category[number];
  strength: number;
}
