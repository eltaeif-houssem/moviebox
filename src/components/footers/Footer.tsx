import React from "react";
import "@styles/components/footers.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <a href="https://github.com/eltaeif-houssem" target="_blank">
            <i className="fa-brands fa-square-github" />
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/eltaeif-houssem" target="_blank">
            <i className="fa-brands fa-linkedin" />
          </a>
        </li>

        <li>
          <a
            href="https://www.upwork.com/freelancers/~010a466427f3bfe69d"
            target="_blank"
          >
            <i className="fa-brands fa-square-upwork" />
          </a>
        </li>
      </ul>

      <ul>
        <li>
          <p>Conditions of use</p>
        </li>

        <li>
          <p>Privacy & Policy</p>
        </li>

        <li>
          <p>Press Room</p>
        </li>
      </ul>

      <p>©2024 Moviebox by Eltaeif Houssem</p>
    </footer>
  );
};

export default Footer;
