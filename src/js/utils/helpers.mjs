export function isValidLength({ userInput, min, max }) {
  const inputLength = userInput.length;
  if (inputLength < min) {
    alert(`${min}글자 이상을 입력해 주세요`);
    return true;
  }
  if (inputLength > max) {
    alert(`${max}글자 이하를 입력해 주세요`);
    return true;
  }
  return false;
}

export function isDuplication({ element, array }) {
  if (array.includes(element)) {
    alert("중복된 역 이름입니다.");
    return true;
  }
  return false;
}
