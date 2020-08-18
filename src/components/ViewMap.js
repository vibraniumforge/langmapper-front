import React from "react";
import Bowser from "bowser";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ViewMap = (props) => {
  console.log(props);
  const browser = Bowser.getParser(window.navigator.userAgent);
  //   console.log(browser.getBrowser()["name"]);
  let isSafari = false;
  if (browser.getBrowser()["name"] === "Safari") {
    isSafari = true;
  }
  return (
    <div>
      {isSafari ? (
        <img
          src={props.translationMapByEtymology}
          type="image/svg+xml"
          className="map"
          alt="Europe map"
          aria-label="Europe map"
          xlinkHref={props.translationMapByEtymology}
        />
      ) : (
        <img
          type="image/svg+xml"
          //   src={props.translationMapByEtymology}
          src="blob:http://localhost:3000/d2e2e9a7-0cdf-b541-8980-c147159e9613"
          className="map"
          alt="Europe map"
          mimetype="image/svg+xml"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  translationMapByArea: state.translations.translationMapByArea,
  translationMapByGender: state.translations.translationMapByGender,
  translationMapByEtymology: state.translations.translationMapByEtymology,
});

export default withRouter(connect(mapStateToProps, null)(ViewMap));
