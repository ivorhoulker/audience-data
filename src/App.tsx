import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css";
import EditableQuestion from "./components/EditableQuestion";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SetQuestions from "./routes/SetQuestions";
import AnswerQuestions from "./routes/AnswerQuestions";

import sample from "./data/sample.json";
import { useSelector } from "react-redux";
import { authIsReady, isLoaded, useFirebase } from "react-redux-firebase";
import { RootState } from "./app/store";
function App() {
  function AuthIsLoaded({ children }: { children: JSX.Element }) {
    const auth = useSelector<RootState>((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <div>splash screen...</div>;
    return children;
  }
  // async function loadData() {
  //   const questionsRef = firestore.collection("questions");
  //   sample.forEach(async (data) => {
  //     const snapshot = await questionsRef
  //       .where("english", "==", data.english)
  //       .get();
  //     if (snapshot.empty) {
  //       questionsRef.add(data);
  //       // const question = snapshot.docs[0].data();
  //       // rest of your code
  //     }
  //   });
  // }
  const firebase = useFirebase();

  return (
    <div className="App">
      <header className="App-header">
        <AuthIsLoaded>
          <Router>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/set-questions">Set Questions</Link>
              </li>
              <li>
                <Link to="/answer-questions">Answer Questions</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/">
                <div>Nuthin much</div>
              </Route>
              <Route exact path="/set-questions">
                <SetQuestions />
              </Route>
              <Route exact path="/answer-questions">
                <AnswerQuestions />
              </Route>
            </Switch>
          </Router>
        </AuthIsLoaded>
      </header>
    </div>
  );
}

export default App;
