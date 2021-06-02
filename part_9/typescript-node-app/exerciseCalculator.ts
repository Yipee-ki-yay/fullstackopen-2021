interface ExercisesResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface RatingValues {
  rating: number
  ratingDescription: string
}

const handleRatingValue = (targetDailyHours: number, average: number): RatingValues => {
  if (average < targetDailyHours) {
    return {rating: 3, ratingDescription: 'not to bad, but could be better'}
  } else if (average === targetDailyHours) {
    return {rating: 2, ratingDescription: 'good'}
  } else if (average > targetDailyHours) {
    return {rating: 1, ratingDescription: 'amazing'}
  }
}

const calculateExercises = (timeDailyHours: number[], targetDailyHours: number): ExercisesResult => {
  const average: number = timeDailyHours.reduce((acc, curr) => acc += curr, 0) / timeDailyHours.length
  const { rating, ratingDescription } = handleRatingValue(targetDailyHours, average)
  return {
    periodLength: timeDailyHours.length,
    trainingDays: timeDailyHours.filter(dh => dh > 0).length,
    success: targetDailyHours <= average / timeDailyHours.length,
    rating,
    ratingDescription,
    target: targetDailyHours,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
