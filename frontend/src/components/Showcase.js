import React from "react";

function Showcase(props) {
  return (
    <div className="showcase-container">
      <div className="typography">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>
      <div
        className="showcase"
        style={{ backgroundImage: `url(${props.background})` }}
      ></div>
    </div>
  );
}

export default Showcase;
