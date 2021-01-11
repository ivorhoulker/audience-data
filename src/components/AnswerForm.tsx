import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState, User } from "../app/store";
import { calculateResults } from "../helpers/calculateResults";
import Typing from "react-typing-animation";
import Answer from "../types/Answer";

import { Question } from "../types/Question";

import AnswerGroup from "./AnswerGroup";
import NameForm from "./NameForm";
interface Props {
  questions: Question[];
}

const AnswerQuestions: React.FC<Props> = ({ questions }) => {
  const answers = useSelector<RootState>(
    (state) => state.firestore.ordered.answers
  ) as Answer[];

  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;
  //to select only this user:
  // useFirestoreConnect([{ collection: "answers", doc: uid }]);
  useFirestoreConnect([{ collection: "answers" }, { collection: "users" }]);
  const users = useSelector<RootState>(
    (state) => state.firestore.ordered.users
  ) as User[];

  const results = useCallback(
    (answer: Answer) => {
      if (!answer) return;

      if (answer && questions) {
        return calculateResults(questions, answer);
      }
    },

    [questions]
  );
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
      <div>
        <form className="flex flex-wrap justify-between p-10 ">
          <div>
            {questions &&
              questions.map((question, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-gray-700 mb-10 rounded-2xl shadow-2xl "
                >
                  <blockquote className="text-xl p-12">
                    {i + 1}. {question.english}
                  </blockquote>

                  {uid && answers && (
                    <AnswerGroup
                      question={question}
                      uid={uid}
                      answers={answers}
                    ></AnswerGroup>
                  )}
                </div>
              ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default AnswerQuestions;
