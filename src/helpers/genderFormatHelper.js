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

// returns - in CHART if language does not feature gender, "not found" if missing
// returns - in CARD if language does not feature gender, "not found" if missing
const genderFormatHelper = (macrofamily, language, gender) => {
  if (
    (macrofamily && !genderedFamilies.includes(macrofamily)) ||
    genderlessLangs.includes(language)
  ) {
    return "∅";
  } else if (!gender) {
    return "?";
  } else {
    return gender.toUpperCase().charAt(0);
  }
};

// gives the gender CARD its color
// gives the text in the CHART gender column its color, it adds "-result" to the className
const genderColorHelper = (macrofamily, language, gender) => {
  if (
    !genderedFamilies.includes(macrofamily) ||
    genderlessLangs.includes(language)
  ) {
    return "none";
  } else {
    if (gender && gender.length > 1) {
      gender = gender.replace(/\xA0/g, " ");
    }
    switch (gender) {
      case "m":
        return "male";
      case "m anim":
        return "male";
      case "m inan":
        return "male";
      case "m pl":
        return "male";
      case "m or f":
        return "male";
      case "m or n":
        return "male";
      case "f":
        return "female";
      case "f pl":
        return "female";
      case "f inan":
        return "female";
      case "f or m":
        return "female";
      case "n":
        return "neuter";
      case "n inan":
        return "neuter";
      case "c":
        return "common";
      case null:
        return "missing";
      default:
        return "none";
    }
  }
};

// returns a boolean if the language has gender in the result CARD. For Bolding
const genderPresenceHelper = (macrofamily, language, gender) => {
  if (
    (macrofamily && !genderedFamilies.includes(macrofamily)) ||
    genderlessLangs.includes(language) ||
    !gender
  ) {
    return false;
  } else {
    return true;
  }
};

// changes the text in the CHART columns to bold for langs that have gender
// missing or null is not bold text.
const genderBoldHelper = (gender) => {
  if (gender && ["m", "f", "n", "c"].includes(gender.charAt(0).toLowerCase())) {
    return true;
  } else {
    return false;
  }
};

export {
  genderFormatHelper,
  genderColorHelper,
  genderPresenceHelper,
  genderBoldHelper,
};
