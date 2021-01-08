import React from "react";
import { sentenceCase } from "../helpers/sentenceCase";
import possibleAnswers from "../data/answers.json";
import { useForm } from "react-hook-form";
import { Question } from "../types/Question";
import { useFirestore } from "react-redux-firebase";
import Answer from "../types/Answer";
import RadioInput from "./RadioInput";

interface Props {
  question: Question;
  uid: string;
  answers: Answer[];
}

const AnswerGroup: React.FC<Props> = ({ question, uid, answers }) => {
  const firestore = useFirestore();
  const previousAnswerValue =
    answers.find((a) => a.id === uid)?.[question.id as keyof Answer] || "0";

  const { register, getValues } = useForm({
    defaultValues: {
      [question.id as keyof Answer]: previousAnswerValue,
    },
  });

  const handleChange = async () => {
    if (typeof uid === "string") {
      await firestore.set(`answers/${uid}`, getValues(), { merge: true });
    }
  };

  return (
    <>
      <div role="radiogroup" className="flex items-stretch">
        {possibleAnswers.reverse().map((answer, i) => (
          <RadioInput
            className={
              i === 0
                ? "rounded-bl-xl"
                : i === possibleAnswers.length - 1
                ? "rounded-br-xl"
                : ""
            }
            key={i}
            id={question.id}
            value={"" + answer.value}
            handleChange={handleChange}
            checked={answer.value === parseInt(previousAnswerValue)}
          >
            {sentenceCase(answer.key)}
          </RadioInput>
        ))}
      </div>
    </>
  );
};

export default AnswerGroup;
