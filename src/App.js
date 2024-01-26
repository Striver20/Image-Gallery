import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import axios from "axios";

// ... (your imports and other code)

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCard] = useState([]);
  const [term, setTerm] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=${term}&image_type=photo&pretty=true`
      )
      .then((res) => {
        setCard(res.data.hits);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setIsLoading(false);
      });
  }, [term]);

  const handleSearch = () => {
    setTerm(temp);
  };

  return (
    <>
      <div className="main_page">
        <div className="search flex flex-row justify-between">
          <input
            type="text"
            className="search_input"
            placeholder="Search by tag..."
            onChange={(e) => setTemp(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="main">
          {isLoading && <p>Loading your photos Please Wait ... </p>}
          {cards.length > 0 &&
            cards.map((info) => (
              <Card
                key={info.id}
                userImageURL={info.userImageURL}
                user={info.user}
                views={info.views}
                downloads={info.downloads}
                likes={info.likes}
                tags={info.tags}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
