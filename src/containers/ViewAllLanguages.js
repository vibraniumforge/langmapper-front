import React, { Component } from "react";
import ViewAllLanguagesResultsContainer from "./ViewAllLanguagesResultsContainer.js";

const REACT_APP_URL = process.env.REACT_APP_URL;

class ViewAllLanguages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getLanguages();
  }

  getLanguages = () => {
    fetch(`${REACT_APP_URL}`)
      .then(res => res.json())
      .then(res => this.setState({ results: res }))
      .catch(err => console.log(err));
  };

  onHandleDelete = (e, languageId) => {
    e.preventDefault();
    fetch(`${REACT_APP_URL}/${languageId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => this.deleteLanguageFromPage(res))
      .catch(err => console.log(err));
  };

  deleteLanguageFromPage = res => {
    const languageId = res.data.id;
    let languageAr = [...this.state.results];
    let newLanguagesAr = languageAr.filter(language => {
      return language.id !== languageId;
    });
    this.setState({ results: newLanguagesAr });
  };

  onHandleEdit = (e, languageId) => {
    e.preventDefault();
    console.log("languageId=", languageId);
    this.props.history.push(`/edit_language/${languageId}`);
  };

  render() {
    return (
      <>
        <ViewAllLanguagesResultsContainer
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
          results={this.state.results}
        />
      </>
    );
  }
}

export default ViewAllLanguages;
