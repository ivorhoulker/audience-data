export interface Question {
  english: string;
  category: valueOf<typeof Category>;
  subcategory: valueOf<typeof Subcategory>;
  strength: number;
  multiplier: number;
}

type valueOf<T> = T[keyof T];

export const Category = {
  ECONOMICS: "economics",
  PERSONAL_FREEDOM: "personal-freedom",
  CULTURE: "culture",
  FOREIGN_POLICY: "foreign-policy",
  GOVERNMENT: "government",
  EQUALITY: "equality",
};

export const Subcategory = {
  CONTROL: "control",
  REGULATION: "regulation",
  MARKETS: "markets",
  FREEDOM: "freedom",
  SECURITY: "security",
  TRUTH: "truth",
  TRADITION: "tradition",
  PROGRESS: "progress",
  OPPORTUNITY: "opportunity",
  OUTCOME: "outcome",
  BURDEN: "burden",
  DEMOCRACY: "democracy",
  AUTHORITY: "authority",
  MINARCHY: "minarchy",
  IMPERIALISM: "imperialism",
  ISOLATIONISM: "isolationism",
  GLOBALISM: "globalism",
};

const test: Question = {
  english: "test",
  category: Category.ECONOMICS,
  subcategory: Subcategory.CONTROL,
  strength: 1,
  multiplier: 2,
};
console.log(test);
