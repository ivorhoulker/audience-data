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
      <div role="radiogroup" className="btn-group">
        {possibleAnswers.map((answer, i) => {
          const classNames = () => {
            let cls =
              "text-base rounded hover:bg-blue-500 px-3 py-1 transition ease-in duration-150 ";
            if (answer.value === parseInt(previousAnswerValue)) {
              cls += "bg-blue-600";
            } else {
              cls += "bg-blue-400 ";
            }
            return cls;
          };
          return (
            <div key={i} className="inline-flex pr-3 pointer-events-auto">
              <input
                type="radio"
                className="hidden"
                id={question.id + answer.key}
                name={question.id}
                value={answer.value}
                autoComplete="off"
                ref={register}
                onChange={handleChange}
              />
              <label
                className={classNames()}
                htmlFor={question.id + answer.key}
              >
                {sentenceCase(answer.key)}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnswerGroup;
