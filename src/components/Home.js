import React from "react";

const url = `http://localhost:3001/api/v1`;

const getTranslationsCount = () => {
  let result;
  fetch(`${url}/search/translation_count`)
    .then(res => res.json())
    .then(res => {
      return (result = res.data);
    })
    .catch(err => console.log(err));
  return result;
};

const getLanguagesCount = () => {
  let result;
  fetch(`${url}/search/language_count`)
    .then(res => res.json())
    .then(res => {
      return (result = res.data);
    })
    .catch(err => console.log(err));
  return result;
};

const getWordCount = () => {
  let result;
  fetch(`${url}/search/word_count`)
    .then(res => res.json())
    .then(res => {
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
      <h3>Currently {getWordCount()} Words</h3>
      <h3>Currently {getLanguagesCount()} Languages</h3>
      <h3>Currently {getTranslationsCount()} Translations</h3>
    </>
  );
};

export default Home;
