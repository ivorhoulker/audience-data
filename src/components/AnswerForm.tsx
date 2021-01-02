import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState, User } from "../app/store";
import { calculateResults } from "../helpers/calculateResults";

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
        <form className="flex flex-wrap justify-between p-10 text-2xl">
          <div className="pb-3">
            <NameForm uid={uid} />
          </div>
          <div className="pb-3">
            {answers &&
              answers.map((answerSet) => {
                const res = results(answerSet);
                const user = users.find((n) => n.id === answerSet.id);
                return (
                  <div
                    key={answerSet.id}
                    className={answerSet.id === uid ? "" : ""}
                  >
                    <h2>Name: {user?.name ?? "Anonymous"} </h2>
                    <small className="text-info">User ID: {answerSet.id}</small>
                    <div>
                      {res &&
                        Object.entries(res).map(([k, r]) => (
                          <small className="pr-3" key={k}>
                            {k + " "}
                            {r ?? ""}% /
                          </small>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            {questions &&
              questions.map((question, i) => (
                <div key={i} className="container mx-auto">
                  <div className="flex m-3 bg-blue-100">
                    <div className="col">
                      <blockquote className="">{question.english}</blockquote>

                      {uid && answers && (
                        <AnswerGroup
                          question={question}
                          uid={uid}
                          answers={answers}
                        ></AnswerGroup>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default AnswerQuestions;
