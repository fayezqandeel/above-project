/* eslint-disable n/no-callback-literal */
// create debounce function to reduce number of calls that sent to api once the user start typing
export const debounce = (callback: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
