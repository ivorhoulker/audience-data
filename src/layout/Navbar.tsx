import Page from "./Page";
import NavLink from "../components/NavLink";
import { matchPath, useRouteMatch } from "react-router";
const Navbar: React.FC = () => {
  // const match = useRouteMatch('/:page/:roomId/:carID') as { params: { page: string } };

  // const isMovieWatchPathActive = !!matchPath(match, '/Movies/:id/watch');
  return (
    <nav className="bg-gray-800 h-16 flex flex-row flex-no-shrink items-center justify-between px-3 shadow-2xl">
      <ul className="flex flex-row flex-no-shrink items-center h-full justify-evenly">
        <NavLink to={`/`}>Are You R?</NavLink>
      </ul>
      <ul className="flex flex-row flex-no-shrink items-center h-full justify-evenly">
        <NavLink to={`/answer`}>Answer</NavLink>
      </ul>
      <ul className="flex flex-row flex-no-shrink items-center h-full justify-evenly">
        <NavLink to={`/see-answers`}>See Answers</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
