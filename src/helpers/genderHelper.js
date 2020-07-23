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
    return "-";
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
      case "n":
        return "neuter";
      case "n inan":
        return "neuter";
      case "c":
        return "neuter";
      case null:
        return "missing";
      default:
        return "none";
    }
  }
};

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
