/**
 * 随机生成一个 max 以内的整数. eg:
 * getRandomInt(3) ==> output: 0, 1, or 2
 */
export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
