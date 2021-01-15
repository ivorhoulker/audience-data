import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { RootState, User } from "../app/store";
import { calculateResults } from "../helpers/calculateResults";
import Typing from "react-typing-animation";
import Answer from "../types/Answer";

import { Question } from "../types/Question";

import AnswerGroup from "./AnswerGroup";
import NameForm from "./NameForm";
import { useForm } from "react-hook-form";
import Button from "./Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
interface Props {
  questions: Question[];
  uid: string;
}

const AnswerQuestions: React.FC<Props> = ({ questions, uid }) => {
  useFirestoreConnect([{ collection: "answers" }]);
  const answers =
    useSelector<RootState>((state) => state.firestore.data.answers?.[uid]) ??
    {};
  const [errors, setErrors] = useState<string[]>([]);
  const firestore = useFirestore();
  const { register, getValues } = useForm();
  const history = useHistory();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = getValues();
    let errors: string[] = [];
    Object.entries(values).forEach(([key, value]) => {
      if (!value || value === "0") {
        errors.push(key);

        return;
      }
    });
    setErrors(errors);
    if (errors.length) {
      try {
        await firestore.set(
          `users/${uid}`,
          { finished: false },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
      console.log("errors", errors);
      return;
    }
    try {
      await firestore.set(`users/${uid}`, { finished: true }, { merge: true });
      history.push("/see-answers");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full">
        <form
          className="flex flex-wrap justify-between w-full "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full">
            {questions &&
              questions.slice(0, 10).map((question, i) => {
                const cls = () => {
                  let output = "";
                  if (errors.includes(question.id)) {
                    output += " ring-2 ring-red-400 ";
                  }
                  return output;
                };
                return (
                  <div
                    key={i}
                    className={
                      "flex flex-col bg-gray-700 mb-10 rounded-2xl shadow-2xl overflow-hidden w-full" +
                      cls()
                    }
                  >
                    <blockquote className="text-xl p-12">
                      {i + 1}. {question.english}
                    </blockquote>

                    {uid && answers && (
                      <AnswerGroup
                        parentErrors={errors}
                        register={register}
                        question={question}
                        uid={uid}
                        answers={answers as Answer}
                      ></AnswerGroup>
                    )}
                  </div>
                );
              })}

            <div className="flex flex-col items-center w-full">
              <Button className="mb-6 w-full" type="submit">
                Submit
              </Button>
              {!!errors.length && (
                <div className="text-red-400">{`${errors.length} question${
                  errors.length > 1 ? "s" : ""
                } remaining.`}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AnswerQuestions;
