import React from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AnswerQuestions from "../routes/AnswerQuestions";

import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { RootState } from "./store";
import Home from "../routes/Home";
import SeeAnswers from "../routes/SeeAnswers";

function App() {
  function AuthIsLoaded({ children }: { children: JSX.Element }) {
    const auth = useSelector<RootState>((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <div>splash screen...</div>;
    return children;
  }
  return (
    <AuthIsLoaded>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/answer" component={AnswerQuestions} />
          <Route exact path="/see-answers" component={SeeAnswers} />
        </Switch>
      </Router>
    </AuthIsLoaded>
  );
}

export default App;
