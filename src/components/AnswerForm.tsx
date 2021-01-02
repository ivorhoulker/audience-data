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
  console.log("questions", questions);
  console.log("answers", answers);
  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;
  //to select only this user:
  // useFirestoreConnect([{ collection: "answers", doc: uid }]);
  useFirestoreConnect([{ collection: "answers" }, { collection: "users" }]);
  const users = useSelector<RootState>(
    (state) => state.firestore.ordered.users
  ) as User[];
  console.log("users", users);
  useEffect(() => {
    if (!answers) return;
    const previousAnswerValue = answers.find((a) => a.id === uid);

    previousAnswerValue &&
      questions &&
      console.log(calculateResults(questions, previousAnswerValue));
  }, [answers, questions]);

  const results = useCallback(
    (answer: Answer, questions: Question[]) => {
      if (!answer) return;

      if (answer && questions) {
        return calculateResults(questions, answer);
      }
    },

    [answers, questions]
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
        <form className="flex flex-wrap justify-between p-10">
          <div className="pb-3">
            <NameForm uid={uid} />
          </div>
          <div className="pb-3">
            {answers &&
              answers.map((answerSet) => {
                const res = results(answerSet, questions);
                const user = users.find((n) => n.id === answerSet.id);
                return (
                  <div
                    key={answerSet.id}
                    className={answerSet.id === uid ? " text-capitalize" : ""}
                  >
                    Name: {user?.name ?? ""} User ID: {answerSet.id}
                    <div>
                      {res &&
                        Object.entries(res).map(([k, r]) => (
                          <div key={k}>{r ?? ""}%</div>
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
                  <div className="card-body">
                    <div className="col-md-6">
                      <blockquote>{question.english}</blockquote>

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
