import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.scss";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState(
    "millie-bobby-brown-converse-collection-release-date-price"
  );
  const [url, setUrl] = useState(
    "https://teaser-fetch-api.herokuapp.com/api/teaser/millie-bobby-brown-converse-collection-release-date-price"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async slug => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(url);
        setData(result.data);
      } catch (err) {
        setIsError(true);
        setErrorMsg(err.message);
        console.log(err.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div className="App">
      {/* {JSON.stringify(data)} */}
      <div className="form">
        <h1>Enter a Slug</h1>
        <form
          onSubmit={e => {
            setUrl(
              `https://teaser-fetch-api.herokuapp.com/api/teaser/${query}`
            );
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="results">
        {isError ? (
          <div>{errorMsg}</div>
        ) : isLoading ? (
          <div>Is Loading</div>
        ) : (
          <div className="teaser">
            <img src={data.imgUrl} alt={data.title} />
            <h2>{data.title}</h2>
            <p>{data.excerpt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
