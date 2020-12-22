import { Question } from "../types/Question";
interface Results {
  economics: number;
  culture: number;
  government: number;
}

interface Answers {
  [key: string]: number;
}

export function calculateResults(questions: Question[], answers: Answers) {
  //try to work out max and min possible in each category
  const startingMinMaxes = {
    economics: [0, 0],
    culture: [0, 0],
    government: [0, 0],
  };
  const minMaxes = questions.reduce((previous, question) => {
    //this avoids mutation. It's equivalent to saying question.strength > 0 && previous[question.category][1] += question.strength
    //multiply by 2 because answers can be +2 or -2
    if (!question.strength) {
      return previous;
    }
    //this could be simplified because max and min are always the same under the current system, but might change
    //so keep like this for now
    const max =
      question.strength > 0
        ? previous[question.category as keyof typeof previous][1] +
          question.strength * 2
        : previous[question.category as keyof typeof previous][1] +
          question.strength * -2;
    const min =
      question.strength < 0
        ? previous[question.category as keyof typeof previous][0] +
          question.strength * 2
        : previous[question.category as keyof typeof previous][0] +
          question.strength * -2;
    const output = { ...previous, [question.category]: [min, max] };
    console.log("qstrength", question.strength, "output", output);
    return output;
  }, startingMinMaxes);
  console.log("minMaxes: ", minMaxes);

  const startingScores: Results = {
    economics: 0,
    culture: 0,
    government: 0,
  };
  const scores = Object.keys(answers).reduce((previous, id, i, obj) => {
    //key is the firebase id
    //answerValue is between -2 and 2, from strongly disagree to strongly agree
    const question = questions.find((q) => q.id === id);
    console.log("question", question);
    if (!question) {
      return previous;
    }
    const answer = answers[id as keyof typeof answers];
    const change = answer * question.strength;
    console.log(
      "answer",
      answer,
      "strength",
      question.strength,
      "change",
      change,
      question.category
    );
    //simple because strength is positive or negative depending on question phrasing
    const modified = {
      ...previous,
      [question.category]:
        previous[question.category as keyof typeof previous] + change,
    };
    //this avoids mutation. It's equivalent to saying previous[question.category] += change
    return modified;
  }, startingScores);
  console.log("scores: ", scores);

  //let's normalise our scores as percentages, with 0 being absolute lefty, 100 being absolute righty
  const percentages = Object.keys(scores).reduce((previous, category) => {
    const [min, max] = minMaxes[category as keyof typeof minMaxes];
    const score = scores[category as keyof typeof minMaxes];
    const range = max - min;

    const percentage = ((score - min) * 100) / range;
    const modified = {
      ...previous,
      [category]: percentage,
    };

    return modified;
  }, startingScores);
  console.log("data :", percentages);

  return percentages;
}
