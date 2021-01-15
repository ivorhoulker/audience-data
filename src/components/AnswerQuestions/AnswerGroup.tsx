import React from "react";
import { sentenceCase } from "../../helpers/sentenceCase";
import possibleAnswers from "../../data/answers.json";
import { useForm } from "react-hook-form";
import { Question } from "../../types/Question";
import { useFirestore } from "react-redux-firebase";
import Answer from "../../types/Answer";
import RadioInput from "./RadioInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface Props {
  question: Question;
  uid: string;
  answers: Answer;
  register: any;
  parentErrors: string[];
}

const AnswerGroup: React.FC<Props> = ({
  question,
  uid,
  answers,
  register,
  parentErrors,
}) => {
  const schema = yup.object().shape({
    [question.id]: yup.number().required(),
  });
  const firestore = useFirestore();
  const previousAnswerValue = answers?.[question.id] || "0";

  const { register: regThis, getValues } = useForm({
    defaultValues: {
      [question.id as keyof Answer]: previousAnswerValue,
    },
    resolver: yupResolver(schema),
  });

  const handleChange = async () => {
    console.log("setting answers", uid, getValues());
    if (typeof uid === "string") {
      await firestore.set(`answers/${uid}`, getValues(), { merge: true });
    }
  };

  return (
    <>
      <div role="radiogroup" className={"flex items-stretch "}>
        {possibleAnswers.reverse().map((answer, i) => {
          return (
            <RadioInput
              ref={(e) => {
                register(e);
                regThis(e);
              }}
              className={
                i === 0
                  ? "rounded-bl-xl"
                  : i === possibleAnswers.length - 1
                  ? "rounded-br-xl"
                  : ""
              }
              key={i}
              index={i}
              id={question.id}
              value={"" + answer.value}
              handleChange={handleChange}
              checked={answer.value === parseInt(previousAnswerValue) ?? 0}
            >
              {sentenceCase(answer.key)}
            </RadioInput>
          );
        })}
      </div>
    </>
  );
};

export default AnswerGroup;