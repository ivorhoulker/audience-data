import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../app/ReduxStore";
import { User } from "../types/User";

interface Props {
  path: string;
  component: React.LazyExoticComponent<React.FC<Props>> | React.FC;

  redirectTo: string;
  restrictedPath: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ ...props }) => {
  const auth = useSelector<RootState>((state) => state.firebase.auth) as {
    uid: string;
  };
  const { component: Component, redirectTo, path } = props;
  const user = useSelector<RootState>(
    (state) => state.firestore.data.users?.[auth.uid]
  ) as User;
  const isAuthenticated = () => {
    if (path === "/answer" && !user?.name) return false;
    if (path === "/see-answers" && !user?.finished) return false;
    return true;
  };
  return (
    <Route {...props}>
      {isAuthenticated() ? (
        <Component {...props} />
      ) : (
        // React.createElement(component, { ...props })
        <Redirect exact to={{ pathname: redirectTo }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
