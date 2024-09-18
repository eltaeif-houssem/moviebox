// src/components/AvatarDropdown.js
import React, { useState, useEffect, useRef } from "react";
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

  return (
    <div className="avatar-dropdown">
      <div className="avatar" onClick={handleToggle} ref={avatarRef}>
        U
      </div>
      {isOpen && (
        <div
          className="dropdown-menu"
          ref={dropdownRef}
          style={{ top: avatarRef.current?.offsetHeight || 0 }}
        >
          <div className="dropdown-item" onClick={handleClose}>
            Profile
          </div>
          <div className="dropdown-item" onClick={handleClose}>
            Settings
          </div>
          <div className="dropdown-item" onClick={handleClose}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
