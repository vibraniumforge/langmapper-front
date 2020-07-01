const etymologyFormatHelper = (etymology) => {
  if (!etymology) {
    return "None found";
  } else if (etymology.length > 140) {
    return etymology.slice(0, 140) + "...";
  } else {
    return etymology;
  }
};

export { etymologyFormatHelper };
