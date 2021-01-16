import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../app/ReduxStore";
import { User } from "../types/User";
import ResultCard from "../components/SeeAnswers/ResultCard";
import { calculateResults } from "../helpers/calculateResults";
import Container from "../layout/Container";
import Page from "../layout/Page";

import Answer from "../types/Answer";

import { Question } from "../types/Question";

const SeeAnswers: React.FC = () => {
  //to select only this user:
  // useFirestoreConnect([{ collection: "answers", doc: uid }]);

  const questions = useSelector<RootState>(
    (state) => state.firestore.ordered.questions
  ) as Question[];

  const answers = useSelector<RootState>(
    (state) => state.firestore.ordered.answers
  ) as Answer[];

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
      <Container>
        <div className="w-full">
          <div className="flex flex-wrap justify-between w-full ">
            <div className="w-full">
              {answers &&
                answers.map((answerSet) => {
                  const res = results(answerSet);
                  const user = users.find((n) => n.id === answerSet.id);
                  return (
                    <ResultCard
                      key={answerSet.id}
                      id={answerSet.id}
                      name={user?.name ?? "Anonymous"}
                      results={res}
                    />
                    // <div
                    //   key={answerSet.id}
                    //   className={answerSet.id === uid ? "" : ""}
                    // >
                    //   <h2>Name: {user?.name ?? "Anonymous"} </h2>
                    //   <small className="text-info">User ID: {answerSet.id}</small>
                    //   <div>
                    //     {res &&
                    //       Object.entries(res).map(([k, r]) => (
                    //         <small className="pr-3" key={k}>
                    //           {k + " "}
                    //           {r ?? ""}% /
                    //         </small>
                    //       ))}
                    //   </div>
                    // </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="pb-3 w-full"></div>
      </Container>
    </Page>
  );
};

export default SeeAnswers;
