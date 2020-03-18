import React from "react";

const url = `http://localhost:3001/api/v1`;

const getLanguagesCount = async () => {
  try {
    let result = await fetch(`${url}/search/language_count`);
    console.log(result);
    // let f = result.json();
    // console.log(f);
    // console.log(result.data);
    // return result.data;
    //   return "hi";
    //   return result.data;
  } catch (err) {
    console.log(err);
  }
};

const getTranslationsCount = () => {
  fetch(`${url}/search/translation_count`)
    .then(res => res.json())
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => console.log(err));
};

const getWordCount = () => {
  let result;
  fetch(`${url}/search/word_count`)
    .then(res => res.json())
    .then(res => {
      console.log(res.data);
      return (result = res.data);
    })
    .then(result => result)
    .catch(err => console.log(err));
  return result;
};

const Home = () => {
  return (
    <>
      <h1>Welcome to LangMapper! The language research tool!</h1>
      {/* <h3>Currently {getLanguagesCount()} Languages</h3> */}
      <h3>Currently {getTranslationsCount()} Translations</h3>
      <h3>Currently {getWordCount()} Words</h3>
    </>
  );
};

export default Home;
