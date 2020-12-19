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
import { auth } from "./Firebase";

function App() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      auth.signInAnonymously();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
