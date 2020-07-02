const genderHelper = (macrofamily, language, gender) => {
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

  if (
    !genderedFamilies.includes(macrofamily) ||
    genderlessLangs.includes(language)
  ) {
    return "N/A";
  } else if (!gender) {
    return "none found";
  } else {
    return gender.toUpperCase();
  }
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
