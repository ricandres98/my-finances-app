function generateNumericCode (digits: number) {
  const max = Math.pow(10, digits);
  const randomNumber = Math.floor(Math.random() * max)
  let randomString = randomNumber.toString()

  while(randomString.length < digits) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomString = randomDigit.toString() + randomString;
  }

  return randomString;
}

export { generateNumericCode };