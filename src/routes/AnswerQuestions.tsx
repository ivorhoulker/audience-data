import React, { useState } from "react";

import EditableQuestion from "../components/EditableQuestion";
import { firestore } from "../Firebase";
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
interface Props {}

const AnswerQuestions: React.FC<Props> = ({}) => {
  //   const questionsRef = firestore.collection("questions");
  //   const query = questionsRef.limit(9999);

  //   const [
  //     questions,
  //     questionsLoading,
  //     questionsError,
  //   ] = useCollectionData<Question>(query);

  //   questions && console.log(questions);
  const handleAddQuestion = () => {
    //TODO
    console.log("adding...");
  };
  const questionsRef = firestore.collection("questions");
  const query = questionsRef.limit(9999);

  const [q, qLoading, qError] = useCollection(query);
  const questions: Question[] =
    q &&
    (q as firebase.firestore.QuerySnapshot).docs.map((doc) => {
      return { ...(doc.data() as Question), id: doc.id };
    });
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
      <form>
        <div className="container-fluid mb-3">
          {questions &&
            questions.map((question) => (
              <div className="card mb-3 bg-light">
                <div className="card-body">
                  <div className="col-md-6">
                    <blockquote>{question.english}</blockquote>

                    <div role="radiogroup" className="btn-group">
                      {answers.map((key, i) => {
                        return (
                          <>
                            <input
                              type="radio"
                              className="btn-check"
                              id={question.id + key}
                              name={question.id}
                              autoComplete="off"
                            />
                            <label
                              className="btn btn-secondary"
                              htmlFor={question.id + key}
                            >
                              {sentenceCase(key)}
                            </label>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default AnswerQuestions;
