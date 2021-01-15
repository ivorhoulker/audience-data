import React from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/ReduxStore";
import { User } from "../types/User";
interface Props {
  to: string;
}

const NavLink: React.FC<Props> = ({ to, children }) => {
  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;
  useFirestoreConnect([{ collection: "users", doc: uid }]);
  const user = useSelector<RootState>(
    ({ firestore }) => firestore.data.users && firestore.data.users[uid]
  ) as User;

  const match = useRouteMatch("/:page") as { params: { page?: string } };
  const cls = () => {
    let output =
      "py-1 px-3 rounded font-bold hover:text-green-400 transition ease-in duration-150 ";
    console.log("MATCH", match?.params, to);
    if (
      match?.params?.page === to.split("/")[1] ||
      (match?.params?.page === undefined && to === "/")
    ) {
      output += "text-green-500  pointer-events-none";
    } else if (!user?.name && to === "/answers") {
      output += "text-gray-400   pointer-events-none";
    } else if (!user?.finished && to === "/see-answers") {
      output += "text-gray-400   pointer-events-none";
    } else {
      output += "text-gray-400  hover:text-gray-100 pointer-events-auto";
    }
    return output;
  };

  return (
    <>
      <li className={cls()}>
        <Link to={to}>{children}</Link>
      </li>
    </>
  );
};

export default NavLink;
