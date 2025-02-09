import React from "react";
import "../style/Header.css"; // CSS file for styling
import img from "../asset/BWB.png"; // Image file for logo

const Header = () => {
  return (
    <header>
      <img src={img} className="img-fluid img" alt="..."></img>
      {/* <div className="header-content text-center">
        <h1 className="text-dark fw-bold">Welcome to BudgetWise</h1>
        <h5 className="text-dark">Manage your budget effectively with ease!</h5>
      </div> */}
    </header>
  );
};

export default Header;
