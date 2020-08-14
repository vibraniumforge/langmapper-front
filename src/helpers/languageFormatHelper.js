const languageFormatHelper = (macrofamily, family) => {
  let newMacrofamily = "";
  let newFamily = family;
  if (macrofamily === "Indo-European") {
    newMacrofamily = "I.E.";
  } else if (macrofamily === "Afro-Asiatic") {
    newMacrofamily = "A.A.";
  } else if (macrofamily === "Northeast Caucasian") {
    newMacrofamily = "N.E. Caucasian";
  } else if (macrofamily === "Northwest Caucasian") {
    newMacrofamily = "N.W. Caucasian";
  } else {
    newMacrofamily = macrofamily;
  }
  return `${newMacrofamily} - ${newFamily}`;
};

const languageFormatHelperCard = (macrofamily) => {
  let newMacrofamily = "";
  if (macrofamily === "Indo-European") {
    newMacrofamily = "I.E.";
  } else if (macrofamily === "Afro-Asiatic") {
    newMacrofamily = "A.A.";
  } else if (macrofamily === "Northeast Caucasian") {
    newMacrofamily = "N.E. Caucasian";
  } else if (macrofamily === "Northwest Caucasian") {
    newMacrofamily = "N.W. Caucasian";
  } else {
    newMacrofamily = macrofamily;
  }
  return newMacrofamily;
};

export { languageFormatHelper, languageFormatHelperCard };
