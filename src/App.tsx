import React from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SetQuestions from "./routes/SetQuestions";
import AnswerQuestions from "./routes/AnswerQuestions";

import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { RootState } from "./app/store";
import Navbar from "./components/Navbar";
function App() {
  function AuthIsLoaded({ children }: { children: JSX.Element }) {
    const auth = useSelector<RootState>((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <div>splash screen...</div>;
    return children;
  }
  return (
    <AuthIsLoaded>
      <Router>
        <Navbar />
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
  );
}

export default App;
