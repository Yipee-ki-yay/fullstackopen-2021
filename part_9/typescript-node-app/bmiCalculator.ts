const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number): void => {
  const result = weight / ((height / 100) * (height / 100))

  if (result < 18.5) {
    console.log(`Underweight (${height} ${weight})`)
  } else if (result >= 18.5 && result < 25) {
    console.log(`Normal (${height} ${weight})`)
  } else if (result >= 25 && result < 30) {
    console.log(`Overweight (${height} ${weight})`)
  } else if (result >= 30) {
    console.log(`Obese (${height} ${weight})`)
  }
}

// console.log(calculateBmi(180, 74))
console.log(calculateBmi(height, weight))