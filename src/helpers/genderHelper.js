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

const genderFormatHelper = (macrofamily, language, gender) => {
  if (
    (macrofamily && !genderedFamilies.includes(macrofamily)) ||
    genderlessLangs.includes(language)
  ) {
    return "N/A";
  } else if (!gender) {
    return "not found";
  } else {
    return gender.toUpperCase().charAt(0);
  }
};

const genderColorHelper = (macrofamily, language, gender) => {
  if (
    !genderedFamilies.includes(macrofamily) ||
    genderlessLangs.includes(language)
  ) {
    return "none";
  } else {
    switch (gender) {
      case "m":
        return "male";
      case "m anim":
        return "male";
      case "f":
        return "female";
      case "n inan":
        return "neuter";
      case "n":
        return "neuter";
      case null:
        return "missing";
      default:
        return "none";
    }
  }
};

const genderPresenceHelper = (language, macrofamily) => {
  if (
    (macrofamily && !genderedFamilies.includes(macrofamily)) ||
    genderlessLangs.includes(language)
  ) {
    return false;
  } else {
    return true;
  }
};

export { genderFormatHelper, genderColorHelper, genderPresenceHelper };
