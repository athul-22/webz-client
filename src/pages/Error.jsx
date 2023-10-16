import React from "react";
import "../css/Errorpage.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="main">
      <div className="container">
        <h1>404</h1>
        <p>
          The link you clicked may be broken or the <br /> page may have been
          removed.
        </p>
        <small>
          Visit the{" "}
          <Link to="/welcome" target="_blank">
            home page
          </Link>{" "}
        </small>
        <div className="circle small" ></div>
        <div className="circle medium"></div>
        <div className="circle big" ></div>
      </div>
    </div>
  );
};

export default Error;
