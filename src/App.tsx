import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css";
import QuestionComponent from "./components/Question";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SetQuestions from "./routes/SetQuestions";
import AnswerQuestions from "./routes/AnswerQuestions";
import { auth, firestore } from "./Firebase";
import sample from "./data/sample.json";
function App() {
  async function loadData() {
    const questionsRef = firestore.collection("questions");
    sample.forEach(async (data) => {
      const snapshot = await questionsRef
        .where("english", "==", data.english)
        .get();
      if (snapshot.empty) {
        questionsRef.add(data);
        // const question = snapshot.docs[0].data();
        // rest of your code
      }
    });
  }
  async function signIn() {
    if (!user) {
      await auth.signInAnonymously();
      //loadData updates firebase from the local /data, replacing by english string
      //no need to call it unless reseeding the whole thing, save money on reads!
      // loadData();
    }
  }
  const [user] = useAuthState(auth);
  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>{JSON.stringify(sample)}</div>
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
            <Route
              exact
              path="/set-questions"
              render={() => {
                return user ? (
                  <Redirect to="/set-questions" />
                ) : (
                  <Redirect to="/" />
                );
              }}
            >
              <SetQuestions />
            </Route>
            <Route exact path="/answer-questions">
              <AnswerQuestions />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
