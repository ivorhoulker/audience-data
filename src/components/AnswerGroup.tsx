import React, { useState, useEffect } from "react";
import { sentenceCase } from "../helpers/sentenceCase";
import possibleAnswers from "../data/answers.json";
import { useForm } from "react-hook-form";
import { Question } from "../types/Question";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import Answer from "../types/Answer";

interface Props {
  question: Question;
}

const AnswerGroup: React.FC<Props> = ({ question }) => {
  useFirestoreConnect([{ collection: "answers" }]);
  const firestore = useFirestore();

  const uid = useSelector<RootState>((state) => state.firebase.auth.uid);
  const currentAnswers = useSelector<RootState>(
    (state) => state.firestore.ordered.answers
  ) as Answer[];
  const [defaults, setDefaults] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { register, reset, handleSubmit, watch, errors, getValues } = useForm();
  useEffect(() => {
    console.log("uid", currentAnswers);
    if (currentAnswers && uid) {
      const found = currentAnswers?.find((a) => a.id === uid)?.[question.id];
      if (found && !loaded) {
        console.log("found");

        reset({
          [question.id]: found,
        });
        setLoaded(true);
      }
    }
  }, [uid, currentAnswers, loaded, question.id, reset]);
  //   const value = (currentAnswers as Answer[]).find((a) => a.id === uid);

  async function createQuestion() {}
  const handleChange = async () => {
    if (typeof uid === "string") {
      const values = getValues();
      await firestore
        .collection("answers")
        .doc(uid)
        .set(getValues(), { merge: true });

      console.log(values);
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
