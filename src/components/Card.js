import React from "react";
import "./Card.css";

function Card(props) {
  const handleClick = (tag) => {
    console.log(tag);
  };

  return (
    <>
      <div className="main_card">
        <div className="img">
          <img src={props.userImageURL} className="image" alt="user" />
        </div>
        <div className="text m-2">
          <h1 className="head font-bold">Photo by {props.user}</h1>
          <div className="views flex flex-row mt-4">
            <h1 className="font-bold mr-2">Views:</h1>
            <p>{props.views}</p>
          </div>
          <div className="downloads flex flex-row">
            <h1 className="font-bold mr-2">Downloads:</h1>
            <p>{props.downloads}</p>
          </div>
          <div className="likes flex flex-row">
            <h1 className="font-bold mr-2">Likes:</h1>
            <p>{props.likes}</p>
          </div>
          <div className="hash flex flex-row justify-evenly">
            {props.tags.split(", ").map((tag, index) => (
              <div className="tag" key={index}>
                <button className="tag-btn" onClick={() => handleClick(tag)}>
                  #{tag}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
