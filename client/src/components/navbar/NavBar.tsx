import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
        <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-game-nights">My Game Nights</Link>
        <Link to="/my-games">My Games</Link>
        <Link to="/find-games">Find Games</Link>
    </div>
    </div>
  )
}

export default NavBar