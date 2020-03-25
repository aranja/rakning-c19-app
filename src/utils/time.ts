export const secondsToTime = seconds => {
  let totalSeconds = seconds;
  const minutes = Math.floor(totalSeconds / 60);
  totalSeconds -= minutes * 60;

  return {
    totalSeconds: seconds,
    minutes,
    seconds: Math.floor(totalSeconds % 60),
  };
};

export const leadingZero = val => (val < 10 ? `0${val}` : `${val}`);

export const secondsToTimeString = total => {
  const time = secondsToTime(total);
  const minutes = leadingZero(time.minutes);
  const seconds = leadingZero(time.seconds);

  return `${minutes}:${seconds}`;
};

export async function sleep(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
