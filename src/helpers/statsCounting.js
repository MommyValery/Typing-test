// принимает количество ошибок и выводит % правильных
export function accuracyCounting(mistakes, pressingCount) {
  if (pressingCount > 0) {
    return (100 - ((mistakes / pressingCount) * 100)).toFixed(1);
  }
  return '0.0';
}

//принимает количество правильнвх символов и секунды, возвращает скорость
export function speedCounting(correctChars, seconds) {
  console.log(correctChars);
  console.log(seconds);
  if (seconds) {
    const words = correctChars / 5;
    const minutes = seconds / 60;
    console.log(words / minutes);
    return (words / minutes).toFixed(1);
  }
  return '0.0';
}