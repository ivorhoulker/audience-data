import React, { useState } from "react";
import { Question as QuestionType } from "../types/Question";
import { firestore, auth, timestamp } from "../Firebase";

const EditableQuestion: React.FC<{ question: QuestionType }> = ({
  question,
}) => {
  const [formValue, setFormValue] = useState("");

  const setQuestion = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { uid } = auth.currentUser!;
    const questionsRef = firestore.collection("questions");
    const doc = await questionsRef.doc("testID").get();
    const content = {
      english: formValue,
      updatedAt: timestamp(),
      uid,
    };
    if (doc.exists) {
      const docId = await questionsRef
        .doc("testID")
        .set(content, { merge: true });
    } else {
      //ADD NEW DOC
      questionsRef.add(content);
    }

    // await questionsRef.add({
    //   text: formValue,
    //   createdAt: timestamp(),
    //   uid,
    // });

    // questionsRef
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       return usernameUnavailable();
    //     }

    //     return createAccount();
    //   })
    //   .catch((error) => handleError(error));
  };

  return (
    <>
      <input
        value={question.english}
        onChange={(e) => setFormValue(e.target.value)}
      ></input>
      <button onClick={setQuestion}>Set</button>
      <ul>
        <li>{question.english}</li>
        <li>{question.category}</li>
      </ul>
    </>
  );
};

export default EditableQuestion;
