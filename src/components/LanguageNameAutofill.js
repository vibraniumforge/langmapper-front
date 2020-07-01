import React, { Component } from "react";

export class LanguageNameAutofill extends Component {
  state = {
    activeLang: 0,
    filteredLangNames: [],
    showLangNames: false,
    userInput: "",
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredLangNames: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onSeachClick = (e) => {
    const userInput = this.state.userInput;
    console.log(userInput);
    this.props.handleOnSubmit(e, userInput);
    this.setState({ userInput: "" });
  };

  onChange = (e) => {
    const { langNames } = this.props;
    const userInput = e.currentTarget.value;
    const filteredLangNames = langNames.filter((langName) => {
      return langName.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });
    this.setState({
      activeLang: 0,
      filteredLangNames,
      showLangNames: true,
      userInput,
    });
  };

  onKeyDown = (e) => {
    const { activeLang, filteredLangNames } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeLang: 0,
        showSuggestions: false,
        userInput: filteredLangNames[activeLang],
      });
    } else if (e.keyCode === 38) {
      if (activeLang === 0) {
        return;
      }
      this.setState({
        activeLang: activeLang - 1,
      });
    } else if (e.keyCode === 40) {
      if (activeLang - 1 === filteredLangNames.length) {
        return;
      }
      this.setState({ activeLang: activeLang + 1 });
    }
  };

  render() {
    const {
      onChange,
      onKeyDown,
      onClick,
      onSeachClick,
      state: { activeLang, filteredLangNames, showLangNames, userInput },
    } = this;
    let langNameList;
    if (showLangNames && userInput) {
      if (filteredLangNames.length) {
        langNameList = (
          <ul className="options">
            {filteredLangNames.map((langName, index) => {
              let className;
              if (index === activeLang) {
                className = "option-active";
              }
              return (
                <li className={className} key={langName} onClick={onClick}>
                  {langName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        langNameList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input
            type="submit"
            value=""
            className="search-btn"
            onClick={onSeachClick}
            disabled={!this.state.userInput}
          />
        </div>
        {langNameList}
      </React.Fragment>
    );
  }
}
export default LanguageNameAutofill;