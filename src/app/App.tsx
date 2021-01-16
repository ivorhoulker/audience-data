import React, { Suspense, useEffect } from "react";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/analytics";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { RootState } from "./ReduxStore";
import SplashScreen from "../components/SplashScreen";
import useAudio from "../audio/useAudio";
// import Home from "../routes/Home";
// const Home = React.lazy(() => import("../routes/Home"));

function App() {
  // async function AuthIsLoaded({ children }: { children: JSX.Element }) {

  const auth = useSelector<RootState>((state) => state.firebase.auth) as {
    uid: string;
  };
  const muted = useSelector<RootState>((state) => state.audio.muted);
  const { startTone, stopTone } = useAudio();
  useEffect(() => {
    if (!muted) {
      startTone();
    } else {
      stopTone();
    }
    return () => {
      stopTone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted]);

  if (!isLoaded(auth)) return <SplashScreen />;
  const Home = React.lazy(() => import("../routes/Home"));
  const SeeAnswers = React.lazy(() => import("../routes/SeeAnswers"));
  const AnswerQuestions = React.lazy(() => import("../routes/AnswerQuestions"));

  return (
    <Suspense fallback={<SplashScreen />}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/see-answers"
            auth={auth}
            exact={true}
            redirectTo="/answer"
            restrictedPath="/see-answers"
            component={SeeAnswers}
          />
          <PrivateRoute
            path="/answer"
            auth={auth}
            exact={true}
            redirectTo="/"
            restrictedPath="/answer"
            component={AnswerQuestions}
          />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
