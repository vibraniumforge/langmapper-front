const languageFormatHelper = (macrofamily, family) => {
  let newMacrofamily = "";
  let newFamily = family;
  if (macrofamily === "Indo-European") {
    newMacrofamily = "I.E.";
  } else if (macrofamily === "Afro-Asiatic") {
    newMacrofamily = "A.A.";
  } else {
    newMacrofamily = macrofamily;
  }
  return `${newMacrofamily} - ${newFamily}`;
};

export { languageFormatHelper };
