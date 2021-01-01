import { Question } from "../types/Question";
interface Results {
  economics: number;
  culture: number;
  government: number;
}

interface Answers {
  [key: string]: number;
}

const MAX_ANSWER_STRENGTH = 2;
const MIN_ANSWER_STRENGTH = -2;

export function calculateMinMaxes(questions: Question[]) {
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
          question.strength * MAX_ANSWER_STRENGTH
        : previous[question.category as keyof typeof previous][1] +
          question.strength * MIN_ANSWER_STRENGTH;
    const min =
      question.strength < 0
        ? previous[question.category as keyof typeof previous][0] +
          question.strength * MAX_ANSWER_STRENGTH
        : previous[question.category as keyof typeof previous][0] +
          question.strength * MIN_ANSWER_STRENGTH;
    const output = { ...previous, [question.category]: [min, max] };

    return output;
  }, startingMinMaxes);

  return minMaxes;
}
export function asPercentage(score: number, min: number, max: number) {
  const range = max - min;
  return ((score - min) * 100) / range;
}

export function calculateResults(questions: Question[], answers: Answers) {
  //minmaxes  will be shifted into a function run onChange of /questions to add the result to a stored min/max value in /results
  const minMaxes = calculateMinMaxes(questions);

  const startingScores: Results = {
    economics: 0,
    culture: 0,
    government: 0,
  };
  const scores = Object.entries(answers).reduce(
    (previous, [questionId, answerValue]) => {
      //key is the firebase id
      //answerValue is between MIN_ANSWER_STRENGTH and MAX_ANSWER_STRENGTH, from strongly disagree to strongly agree
      const question = questions.find((q) => q.id === questionId);
      console.log("question", question);
      if (!question) {
        //question has probably been removed since it was answered, so don't count it
        return previous;
      }
      const change = answerValue * question.strength;
      console.log(
        "answer",
        answerValue,
        "strength",
        question.strength,
        "change",
        change,
        question.category
      );
      //simple because strength is positive or negative depending on question phrasing
      const score =
        previous[question.category as keyof typeof previous] + change;
      const [min, max] = minMaxes[question.category as keyof typeof minMaxes];
      const scorePercentage = asPercentage(score, min, max);

      const modified = {
        ...previous,
        [question.category]: scorePercentage,
      };
      //this avoids mutation
      return modified;
    },
    startingScores
  );
  console.log("scores: ", scores);
}

//let's normalise our scores as percentages, with 0 being absolute lefty, 100 being absolute righty
//   const percentages = Object.keys(scores).reduce((previous, category) => {
//     const [min, max] = minMaxes[category as keyof typeof minMaxes];
//     const score = scores[category as keyof typeof minMaxes];
//     const range = max - min;

//     const percentage = ((score - min) * 100) / range;
//     const modified = {
//       ...previous,
//       [category]: percentage,
//     };

//     return modified;
//   }, startingScores);
//   console.log("data :", percentages);

//   return percentages;
// }
