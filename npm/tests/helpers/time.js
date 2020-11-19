export const advanceTime = (baseTime, advanceBy) => {
  Date.now = jest.fn(() => baseTime + advanceBy);
  jest.advanceTimersByTime(advanceBy);
}