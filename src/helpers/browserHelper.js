import Bowser from "bowser";

const isSafari = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  if (browser.getBrowser()["name"] === "Safari") {
    return true;
  }
  return false;
};

export { isSafari };
