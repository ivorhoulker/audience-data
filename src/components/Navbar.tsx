import NavLink from "./NavLink";
import Unmute from "./Unmute";
const Navbar: React.FC = () => {
  // const match = useRouteMatch('/:page/:roomId/:carID') as { params: { page: string } };

  // const isMovieWatchPathActive = !!matchPath(match, '/Movies/:id/watch');
  return (
    <nav className="bg-gray-800 py-3 md:py-5 flex flex-row flex-no-shrink items-center justify-between px-3 shadow-2xl">
      <NavLink to={`/`}>Are You R?</NavLink>

      <NavLink to={`/answer`}>Answer</NavLink>

      <NavLink to={`/see-answers`}>See Answers</NavLink>

      <Unmute />
    </nav>
  );
};

export default Navbar;
