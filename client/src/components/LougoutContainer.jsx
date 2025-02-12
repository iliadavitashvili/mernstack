import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";

const LougoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout((prev) => !prev)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {/* <FaUserCircle /> */}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          Logout{" "}
        </button>
      </div>
    </Wrapper>
  );
};
export default LougoutContainer;
