import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../app/store";
import { calculateResults } from "../helpers/calculateResults";

import Answer from "../types/Answer";

import { Question } from "../types/Question";

import AnswerGroup from "./AnswerGroup";
interface Props {
  questions: Question[];
}

const AnswerQuestions: React.FC<Props> = ({ questions }) => {
  useFirestoreConnect([{ collection: "answers" }]);

  const answers = useSelector<RootState>(
    (state) => state.firestore.ordered.answers
  ) as Answer[];
  console.log("questions", questions);
  console.log("answers", answers);
  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;
  useEffect(() => {
    if (!answers) return;
    const previousAnswerValue = answers.find((a) => a.id === uid);

    previousAnswerValue &&
      questions &&
      console.log(calculateResults(questions, previousAnswerValue));
  }, [answers, questions]);
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
        <form className="flex flex-wrap justify-between pt-12 -mx-6">
          <div className="container">
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
