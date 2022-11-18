import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  // Get value from user
  const [userText, setUserText] = useState("");
  const [apiResults, setApiResults] = useState([]);

  // Search URL w/ User Value
  let url = `https://api.datamuse.com/words?rel_syn=${userText}`;

  // GET request
  const fetcher = () => {
    axios.get(url).then((res) => {
      console.log("DATA: ", res);
      res.data.map(({ word }) => {
        setApiResults((apiResults) => [...apiResults, word]);
      });
    });
  };

  // useEffect
  // useEffect(() => {
  //   fetcher();
  // }, []);

  // onSubmit
  const submitForm = (e) => {
    fetcher();
    e.preventDefault();
  };

  // Reset form
  const handleReset = () => {
    setApiResults([]);
    setUserText("");
  };

  // Test console.log
  // console.log(apiResults);

  return (
    <>
      <h1>Synonym Finder</h1>
      <p>Type in a word below and I will give you synonyms for it.</p>
      {/* Input Form */}
      <form id="inputForm" onSubmit={submitForm}>
        <input
          type="text"
          value={userText}
          onChange={(e) => {
            setUserText(e.target.value);
          }}
        />
        <input type="submit" value="Submit" />
        <input type="reset" value="Clear" onClick={handleReset} />
      </form>
      {/* results */}
      <h3>Results:</h3>
      {/* Map Through Results */}
      {apiResults.map((result) => {
        if (apiResults.length === 0) {
          return <p>none</p>;
        } else {
          return <p key={result}>{result}</p>;
        }
      })}
    </>
  );
};

export default Form;
