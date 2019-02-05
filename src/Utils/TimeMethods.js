
/**
 * Returns time (ms) formatted as mm:ss
 * @param {number} time time in ms.
 * @returns {string} time formatted as mm:ss
 */
export function formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = ((time % 60000) / 1000);
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`;
}
