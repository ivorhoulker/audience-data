import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../app/ReduxStore";
import { User } from "../types/User";

interface Props {
  path: string;
  component: React.LazyExoticComponent<React.FC<Props>>;
  auth: { uid: string };
  redirectTo: string;
  restrictedPath: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ ...props }) => {
  const { component: Component, redirectTo, auth, path } = props;
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
