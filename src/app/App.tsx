import React, { Suspense } from "react";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/analytics";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { RootState } from "./ReduxStore";
import SplashScreen from "../components/SplashScreen";
// import Home from "../routes/Home";
// const Home = React.lazy(() => import("../routes/Home"));

function App() {
  // async function AuthIsLoaded({ children }: { children: JSX.Element }) {

  const auth = useSelector<RootState>((state) => state.firebase.auth) as {
    uid: string;
  };
  // const user =
  //   isLoaded(auth) &&
  //   useSelector<RootState>((state) => state.firestore.data.users[auth.uid]);
  // console.log("auth state", user);
  // console.log("auth uid", (auth as { uid: string }).uid ?? "");
  // const uid = useSelector<RootState>(
  //   (state) => state.firebase.auth.uid
  // ) as string;
  // useFirestoreConnect([{ collection: "users", doc: uid }]);

  // const userMatches = useSelector<RootState>(
  //   ({ firestore }) => firestore.data.users && firestore.data.users[uid]
  // ) as User;
  // console.log("uid", uid, userMatches);
  //   if (!isLoaded(auth)) return <SplashScreen />;
  //   return children;
  // }
  if (!isLoaded(auth)) return <SplashScreen />;
  const Home = React.lazy(() => import("../routes/Home"));
  const SeeAnswers = React.lazy(() => import("../routes/SeeAnswers"));
  const AnswerQuestions = React.lazy(() => import("../routes/AnswerQuestions"));

  // const canAnswer = () => {
  //   return userMatches.name;
  // };
  // const canSeeAnswers = () => {
  //   return userMatches.finished;
  // };
  return (
    <Suspense fallback={<SplashScreen />}>
      <Router>
        <Switch>
          {/* <
          <PrivateRoute
            isAuthenticated={false}
            redirectTo="/"
            restrictedPath="/see-answers"
            component={SeeAnswers}
          /> */}

          {/* <Route exact path="/answer" component={AnswerQuestions} /> */}
          {/* <Route exact path="/answer">
            {true ? <AnswerQuestions /> : <Redirect to="/" />}
          </Route> */}
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
