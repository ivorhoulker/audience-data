import React from "react";
import { sentenceCase } from "../helpers/sentenceCase";
import possibleAnswers from "../data/answers.json";
import { useForm } from "react-hook-form";
import { Question } from "../types/Question";
import { useFirestore } from "react-redux-firebase";
import Answer from "../types/Answer";

interface Props {
  question: Question;
  uid: string;
  answers: Answer[];
}

const AnswerGroup: React.FC<Props> = ({ question, uid, answers }) => {
  const firestore = useFirestore();
  const previousAnswerValue =
    answers.find((a) => a.id === uid)?.[question.id as keyof Answer] || 0;

  const { register, getValues } = useForm({
    defaultValues: {
      [question.id as keyof Answer]: previousAnswerValue,
    },
  });

  const handleChange = async () => {
    if (typeof uid === "string") {
      await firestore.update(`answers/${uid}`, getValues());
    }
  };

  return (
    <>
      <div role="radiogroup" className="btn-group">
        {possibleAnswers.map((answer, i) => {
          return (
            <React.Fragment key={i}>
              <input
                type="radio"
                className="btn-check"
                id={question.id + answer.key}
                name={question.id}
                value={answer.value}
                autoComplete="off"
                ref={register}
                onChange={handleChange}
              />
              <label
                className="btn btn-secondary"
                htmlFor={question.id + answer.key}
              >
                {sentenceCase(answer.key)}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default AnswerGroup;
