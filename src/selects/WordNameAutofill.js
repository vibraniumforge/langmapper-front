import React, { Component } from "react";

export class WordNameAutofill extends Component {
  state = {
    activeWord: 0,
    filteredWordNames: [],
    showWordNames: false,
    userInput: "",
    showError: false,
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredWordNames: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
      showError: false,
    });
  };

  onSeachClick = (e) => {
    const userInput = this.state.userInput;
    this.props.handleOnSubmit(e, userInput);
    this.setState({ userInput: "" });
  };

  onChange = (e) => {
    const { wordNames } = this.props;
    console.log(wordNames);
    const userInput = e.currentTarget.value;
    const filteredWordNames = wordNames.filter((wordName) => {
      return wordName.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });
    this.setState({
      activeWord: 0,
      filteredWordNames,
      showWordNames: true,
      userInput,
      showError: true,
    });
  };

  onKeyDown = (e) => {
    const { activeWord, filteredWordNames } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeWord: 0,
        showSuggestions: false,
        userInput: filteredWordNames[activeWord],
      });
    } else if (e.keyCode === 38) {
      if (activeWord === 0) {
        return;
      }
      this.setState({
        activeWord: activeWord - 1,
      });
    } else if (e.keyCode === 40) {
      if (activeWord - 1 === filteredWordNames.length) {
        return;
      }
      this.setState({ activeWord: activeWord + 1 });
    }
  };

  render() {
    // console.log(this.props);
    const {
      onChange,
      onKeyDown,
      onClick,
      onSeachClick,
      state: { activeWord, filteredWordNames, showWordNames, userInput },
    } = this;
    let wordNameList;
    if (showWordNames && userInput) {
      if (filteredWordNames.length) {
        wordNameList = (
          <ul className="options">
            {filteredWordNames.map((wordName, index) => {
              let className;
              if (index === activeWord) {
                className = "option-active";
              }
              return (
                <li className={className} key={wordName} onClick={onClick}>
                  {wordName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        if (this.state.showError) {
          wordNameList = (
            <div className="no-options">
              <em>No Option!</em>
            </div>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <div className="search-autofill hide-scroll">
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
            className="search-btn search-img"
            onClick={onSeachClick}
            disabled={!this.state.userInput}
          />
        </div>
        {wordNameList}
      </React.Fragment>
    );
  }
}
export default WordNameAutofill;
