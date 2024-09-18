import React, { useState, useEffect, useRef } from "react";
import authService from "@/services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import avatar from "@assets/avatar.png";
import "@styles/components/menus.css";

const AvatarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const avatarRef = useRef<any>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    const response = await authService.signout();
    if (response.error) {
      toast.error(response.error);
    }
    handleClose();
  };

  return (
    <div className="avatar-dropdown">
      <img
        src={avatar}
        className="avatar"
        onClick={handleToggle}
        ref={avatarRef}
      />
      {isOpen && (
        <div
          className="dropdown-menu"
          ref={dropdownRef}
          style={{ top: avatarRef.current?.offsetHeight || 0 }}
        >
          <div className="dropdown-item" onClick={handleClose}>
            <i className="fa-solid fa-user" /> Profile
          </div>
          <div className="dropdown-item" onClick={handleClose}>
            <i className="fa-solid fa-bookmark" /> Saved
          </div>
          <div className="dropdown-item" onClick={logoutHandler}>
            <i className="fa-solid fa-right-from-bracket" /> Logout
          </div>
        </div>
      )}
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default AvatarMenu;
