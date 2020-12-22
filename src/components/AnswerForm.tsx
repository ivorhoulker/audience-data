import React, { useState } from "react";

import EditableQuestion from "../components/EditableQuestion";

import firebase from "firebase/app";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { Question } from "../types/Question";

import answers from "../data/answers.json";
import { sentenceCase } from "../helpers/sentenceCase";
interface Props {
  questions: Question[];
}

const AnswerQuestions: React.FC<Props> = ({ questions }) => {
  //   const questionsRef = firestore.collection("questions");
  //   const query = questionsRef.limit(9999);

  //   const [
  //     questions,
  //     questionsLoading,
  //     questionsError,
  //   ] = useCollectionData<Question>(query);

  //   questions && console.log(questions);
  // const handleAddQuestion = () => {
  //   //TODO
  //   console.log("adding...");
  // };
  // const questionsRef = firestore.collection("questions");
  // const query = questionsRef.limit(9999);

  // const [q, qLoading, qError] = useCollection(query);
  // const questions: Question[] =
  //   q &&
  //   (q as firebase.firestore.QuerySnapshot).docs.map((doc) => {
  //     return { ...(doc.data() as Question), id: doc.id };
  //   });
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
            questions.map((question, i) => (
              <div key={i} className="card mb-3 bg-light">
                <div className="card-body">
                  <div className="col-md-6">
                    <blockquote>{question.english}</blockquote>

                    <div role="radiogroup" className="btn-group">
                      {answers.map((answer, i) => {
                        return (
                          <React.Fragment key={i}>
                            <input
                              type="radio"
                              className="btn-check"
                              id={question.id + answer.key}
                              name={question.id}
                              autoComplete="off"
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
