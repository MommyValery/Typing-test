// принимает количество ошибок и выводит % правильных
export function accuracyCounting (mistakes, pressingCount) {
 if (pressingCount) {
    return (100 - ((mistakes/pressingCount)*100)).toFixed(1);
 }
 return '0.0';
}

//принимает количество правильнвх символов и секунды, возвращает скорость
export function speedCounting (correctChars, seconds) {
 if (seconds) {
    const words = correctChars / 5;
    const minutes = seconds / 60;
    return (words/minutes).toFixed(1);
 }
 return '0.0';
}