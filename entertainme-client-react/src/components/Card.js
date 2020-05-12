import React from "react";
import { Link } from "react-router-dom";

function Card({ content, from }) {
  return (
    <>
      <Link to={`${from}/${content._id}`}>
        <img
          style={{ width: "200px" }}
          src={content.poster_path}
          alt={content._id}
        />
      </Link>
    </>
  );
}

export default Card;
