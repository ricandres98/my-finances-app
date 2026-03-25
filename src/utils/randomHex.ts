const randomHex = () => {
  const set = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

  const colorCode: string[] = [];

  const randomIndex = () => Math.floor(Math.random() * 16);

  for (let i = 0; i < 6; i++) {
    colorCode.push(set[randomIndex()]);
  }

  return "#" + colorCode.join("");
}

export { randomHex };