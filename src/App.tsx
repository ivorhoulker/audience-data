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
function App() {
  function AuthIsLoaded({ children }: { children: JSX.Element }) {
    const auth = useSelector<RootState>((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <div>splash screen...</div>;
    return children;
  }
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
