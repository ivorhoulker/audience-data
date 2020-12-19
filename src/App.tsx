import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import firebase from "./Firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css";

const firestore = firebase.firestore();
const auth = firebase.auth();
interface Question {
  question: string;
  weighting: number;
}
function App() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      auth.signInAnonymously();
    }
  }, []);
  const questionsRef = firestore.collection("questions");
  const query = questionsRef.orderBy("weighting").limit(9999);

  const [questions] = useCollectionData(query);
  const [answer, setAnswer] = useState("");
  console.log(questions);
  const handleSubmit = () => {};
  return (
    <div className="App">
      <header className="App-header">
        {questions &&
          (questions as Question[]).map((q, i) => {
            return <div key={i}>{q.question}</div>;
          })}
      </header>

      <input value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
      <button onClick={handleSubmit}></button>
    </div>
  );
}

export default App;
