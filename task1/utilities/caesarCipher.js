const data = {
  result: '',
  minLowCharValue: 'a'.charCodeAt(0),
  maxLowCharValue: 'z'.charCodeAt(0),
  minUpCharValue: 'A'.charCodeAt(0),
  maxUpCharValue: 'Z'.charCodeAt(0),
  letterAmount: 26
};

function encode(text, shift) {
  function transformedLetter(letter, correction) {
    return String.fromCharCode(
      ((letter + +shift - correction) % data.letterAmount) + correction
    );
  }

  for (let i = 0; i < text.length; i++) {
    const letter = text.charCodeAt(i);
    if (letter >= data.minUpCharValue && letter <= data.maxLowCharValue) {
      if (letter >= data.minUpCharValue && letter <= data.maxUpCharValue) {
        data.result += transformedLetter(letter, data.minUpCharValue);
      } else {
        data.result += transformedLetter(letter, data.minLowCharValue);
      }
    } else {
      data.result += text[i];
    }
  }
  return data.result;
}

function decode(text, shift) {
  return encode(text, (data.letterAmount - +shift) % data.letterAmount);
}

module.exports = { encode, decode };
