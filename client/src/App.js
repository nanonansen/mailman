import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.scss";

const APIUrl = "http://localhost:5000/api/teaser/query?page=";
const Query =
  "https://hypebeast.com/2019/11/martin-wong-supreme-fw19-collection-info";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState(Query);
  const [url, setUrl] = useState(`${APIUrl}${Query}`);
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
        <h1>
          <span role="img" aria-label="Magic Emoji">
            ✨
          </span>
          Magic Teaser Fetcher
        </h1>
        <form
          onSubmit={e => {
            setUrl(`${APIUrl}${query}`);
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
