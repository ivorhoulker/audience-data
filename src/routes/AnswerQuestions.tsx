import React, { useState, useRef } from "react";

import EditableQuestion from "../components/EditableQuestion";
import { firestore, auth } from "../Firebase";
import firebase from "firebase/app";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { Question } from "../types/Question";
import QuestionForm from "../components/QuestionForm";
import AnswerForm from "../components/AnswerForm";
import answers from "../data/answers.json";
import { sentenceCase } from "../helpers/sentenceCase";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { ResourceLimits } from "worker_threads";
import { calculateResults } from "../helpers/calculateResults";
interface Props {}

const AnswerQuestions: React.FC<Props> = ({}) => {
  const questionsRef = firestore.collection("questions");
  let uid = "";
  if (auth.currentUser) {
    uid = auth.currentUser.uid;
  }
  const query = questionsRef.limit(9999);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    errors,
    getValues,
    formState: { isSubmitting },
  } = useForm<Question>();

  useFormPersist(
    "foo",
    { watch, setValue },
    {
      storage: window.localStorage, // default window.sessionStorage
    }
  );
  const [q, qLoading, qError] = useCollection(query);
  const questions: Question[] =
    q &&
    (q as firebase.firestore.QuerySnapshot).docs.map((doc) => {
      return { ...(doc.data() as Question), id: doc.id };
    });
  const answersRef = firestore.collection("answers");

  const onSubmit = async (data: { [key: string]: any }) => {
    Object.keys(data).forEach((key) => {
      !data[key] ? delete data[key] : (data[key] = parseInt(data[key]));
    });
    await answersRef.doc(uid).set(data, { merge: true });
    console.log("data: ", data);
    console.log("calculation: ", calculateResults(questions, data));
    console.log("done");
    // const content = {
    //   ...data,
    //   updatedAt: timestamp(),
    //   editedBy: uid,
    // };
    // console.log("content: ", content);
    // if (doc.exists) {
    //   await questionsRef.doc(question.id).set(content, { merge: true });
    //   alert("done");
    // } else {
    //   //ADD NEW DOC
    //   console.warn("id not found in firebase");
    //   // await questionsRef.add(content);
    // }
    // console.log("data", data);
  };

  return (
    <>
      {/* {questionsError && (
        <strong>Error: {JSON.stringify(questionsError)}</strong>
      )}
      {questionsLoading && <span>Collection: Loading...</span>}
      {questions &&
        questions.map((q, i) => {
          return <EditableQuestion key={i} question={q} />;
        })} */}
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid mb-3">
          {questions &&
            questions.map((question, i) => (
              <div key={"question" + i} className="card mb-3 bg-light">
                <div className="card-body">
                  <div className="col-md-6">
                    <blockquote>{question.english}</blockquote>

                    <div role="radiogroup" className="btn-group">
                      {answers.map((answer, j) => {
                        const combinedId = `${question.id}${answer.key}`;
                        return (
                          <React.Fragment key={j + "input"}>
                            <input
                              type="radio"
                              className="btn-check"
                              id={combinedId}
                              name={question.id}
                              autoComplete="off"
                              value={answer.value}
                              ref={register}
                            />
                            <label
                              className="btn btn-secondary"
                              htmlFor={combinedId}
                            >
                              {sentenceCase(answer.key)}
                            </label>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="col-12">
            <button
              disabled={isSubmitting}
              className="btn btn-primary"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AnswerQuestions;
