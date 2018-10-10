import React from "react";
import "./Card.scss";

const Card = ({ icon, rotated }) => (
  <div className={`card${rotated ? " rotate" : ""}`}>
    <div className="front" />
    <div className={`back fa fa-${icon}`} />
  </div>
);

export default Card;
