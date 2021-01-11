import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState, User } from "../app/store";
import { calculateResults } from "../helpers/calculateResults";
import Page from "../layout/Page";

import Answer from "../types/Answer";

import { Question } from "../types/Question";

interface Props {}

const SeeAnswers: React.FC<Props> = ({}) => {
  //to select only this user:
  // useFirestoreConnect([{ collection: "answers", doc: uid }]);
  useFirestoreConnect([
    { collection: "questions" },
    { collection: "answers" },
    { collection: "users" },
  ]);
  const questions = useSelector<RootState>(
    (state) => state.firestore.ordered.questions
  ) as Question[];

  const answers = useSelector<RootState>(
    (state) => state.firestore.ordered.answers
  ) as Answer[];

  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;
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
    <Page>
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
    </Page>
  );
};

export default SeeAnswers;
