import React from "react";
import { Link } from "react-router-dom";
import { matchPath, useRouteMatch } from "react-router";
interface Props {
  to: string;
}

const NavLink: React.FC<Props> = ({ to, children }) => {
  const match = useRouteMatch("/:page") as { params: { page?: string } };
  const cls = () => {
    let output = "py-1 px-3 rounded font-bold ";
    console.log("MATCH", match?.params, to);
    if (
      match?.params?.page === to.split("/")[1] ||
      (match?.params?.page === undefined && to === "/")
    ) {
      output += "text-gray-100  pointer-events-none";
    } else {
      output += "text-gray-400 hover:text-gray-100 pointer-events-auto";
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
