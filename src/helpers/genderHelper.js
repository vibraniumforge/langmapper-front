const genderHelper = (macrofamily, language) => {
  const genderlessLangs = [
    "Afrikaans",
    "Armenian",
    "Bengali",
    "English",
    "Konkani",
    "Ossetian",
    "Persian",
    "Scots",
  ];
  const genderedFamilies = ["Indo-European", "Afro-Asiatic"];

  if (!genderedFamilies.includes(macrofamily)) {
    return false;
  }
  if (genderlessLangs.includes(language)) {
    return false;
  }

  return true;
};

const genderColorHelper = (gender) => {
  switch (gender) {
    case "m":
      return "male-result";
    case "f":
      return "female-result";
    case "n":
      return "neuter-result";
    default:
      return "";
  }
};

export { genderHelper, genderColorHelper };
