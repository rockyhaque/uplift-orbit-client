import { Link } from "react-router-dom";
import CustomNavLink from "../CustomNavLink/CustomNavLink";
import { CgMenuMotion } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        // console.log("User Logged Out");
        toast.success(`User Logged Out Successfully!`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinks = (
    <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
      <li>
        <CustomNavLink to="/">Home</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/login">Login</CustomNavLink>
      </li>
      
      <li>
        <CustomNavLink to="/register">Register</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/addJob">Add Job</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/myPostedJob">My Posted Job</CustomNavLink>
      </li>
    </div>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CgMenuMotion size={30} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <div>
            <img
              className="w-12"
              src="https://i.ibb.co/Pt6LLkv/room.png"
              alt=""
            />
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Uplift Orbit
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <div>
            {user ? (
              <div
                className="dropdown dropdown-end "
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.displayName}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="photo"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <Link to="/updateProfile">Settings</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
