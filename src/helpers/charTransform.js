//поиск текущего символа
export const getCurrentChar = (array, currentIndex) => {
  return array.map((item, index) => {
    if (index === currentIndex) {
      return {
        ...item,
        class: 'current-char'
      }
    }
    return item;
  })
}

//сравнение данного и введенного символа
export const compareChars = (array, currentIndex, pressedKey, mistakes) => {
  let newCurrentIndex = currentIndex;
  let newMistakes = mistakes;

  const resultArr = array.map((item, index) => {
    if (index === currentIndex && item.char === pressedKey) {
      newCurrentIndex += 1;
      return {
        ...item,
        class: 'right-char',
      }
    } else if (index === currentIndex && item.char !== pressedKey) {
      newMistakes += 1;
      newCurrentIndex += 1;
      return {
        ...item,
        class: 'wrong-char',
      }

    }
    return item;
  })
  return [resultArr, newCurrentIndex, newMistakes];
};

//приведение массива с текстом в изначальное состояние
export const restoreText = (array) => {
  return array.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        class: 'current-char',
      }
    }
    return {
      ...item,
      class: '',
    };
  });
};
