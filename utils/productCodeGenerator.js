const bcrypt = require("bcryptjs");

const generateProductCode = (productName) => {
  const substrings = [];
  let currentSubstring = "";

  for (let i = 0; i < productName.length; i++) {
    const char = productName[i].toLowerCase();
    if (
      currentSubstring === "" ||
      char > currentSubstring[currentSubstring.length - 1]
    ) {
      currentSubstring += char;
    } else {
      if (currentSubstring.length > 1) substrings.push(currentSubstring);
      currentSubstring = char;
    }
  }
  if (currentSubstring.length > 1) substrings.push(currentSubstring);

  const maxLength = Math.max(...substrings.map((s) => s.length));
  const longestSubstrings = substrings.filter((s) => s.length === maxLength);
  const concatenatedSubstring = longestSubstrings.join("");

  const startIndex = productName.toLowerCase().indexOf(longestSubstrings[0]);
  const endIndex =
    productName
      .toLowerCase()
      .lastIndexOf(longestSubstrings[longestSubstrings.length - 1]) +
    longestSubstrings[0].length -
    1;

  const hashedName = bcrypt.hashSync(productName, 8).slice(-10);

  return `${hashedName}-${startIndex}${concatenatedSubstring}${endIndex}`;
};

module.exports = generateProductCode;
