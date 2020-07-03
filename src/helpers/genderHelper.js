const genderedFamilies = ["Indo-European", "Afro-Asiatic"];
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

const genderHelper = (macrofamily, language, gender) => {
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

const genderColorHelper = (macrofamily, language, gender) => {
  //   debugger;
  if (
    !genderedFamilies.includes(macrofamily) ||
    genderlessLangs.includes(language)
  ) {
    return "none";
  } else {
    switch (gender) {
      case "m":
        return "male";
      case "f":
        return "female";
      case "n":
        return "neuter";
      case null:
        return "missing";
      default:
        return "none";
    }
  }
};

export { genderHelper, genderColorHelper };
