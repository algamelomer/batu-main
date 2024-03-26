/**
 * this is a function that returns values counting up with ease out animation
 *
 * @param {*} start the starting point of the count
 * @param {*} end  the ending point
 * @param {*} duration the duration of the animation in seconds
 * @param {*} valueCallback the call back that gets called with the new value
 *                          every time the value gets updated
 */ 

export default function countUp(start, end, duration, valueCallback) {
  const easeOut = (t) => 1 - Math.pow(1 - t, 2);
  const interval = 1000 / 60; // 60 FPS

  let currentTime = 0;

  const animate = () => {
    currentTime += interval / 1000; // Convert milliseconds to seconds
    const progress = easeOut(Math.min(currentTime / duration, 1));
    const value = start + (end - start) * progress;

    if (currentTime < duration) {
      setTimeout(animate, interval);
    } else {
      valueCallback(end);
    }

    valueCallback(Math.round(value));
  };

  animate();
}