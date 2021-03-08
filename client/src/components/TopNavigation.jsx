import { Link } from "react-router-dom";

function TopNavigation() {
  return (
    <div>
      <Link to="/">Home</Link>&nbsp;&nbsp;
      <Link to="/profile">Profile</Link> &nbsp;&nbsp;
      <Link to="/login">Login</Link> &nbsp;&nbsp;
      <Link to="/cart">Cart</Link> &nbsp;&nbsp;
      <Link to="/profile">Profile</Link> &nbsp;&nbsp;
    </div>
  );
}

export default TopNavigation;
