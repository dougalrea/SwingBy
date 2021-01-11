import faker from 'faker'

function generateUserReviews() {
  const userReviews = []
  for (let i = 0; i < 300; i++) {
    const text = faker.lorem.sentences(1)
    const rating = Math.floor(Math.random() * 5) + 1
    userReviews.push({ text, rating })
  }
  return userReviews
}

const userReviewData = generateUserReviews()

export default userReviewData

// export default [
//   {
//     text: 'really great dude',
//     rating: 5
//   },
//   {
//     text: 'best chef in town',
//     rating: 4
//   },
//   {
//     text: 'had a weird look in his eye',
//     rating: 2
//   },
//   {
//     text: 'not very friendly',
//     rating: 1
//   },
//   {
//     text: 'kind of a boring person',
//     rating: 3
//   },
//   {
//     text: 'didn\'t speak any english so not a clue what he said',
//     rating: 4
//   },
//   {
//     text: 'my new best friend!',
//     rating: 5
//   },
//   {
//     text: 'good company, we chatted for hours and hours',
//     rating: 4
//   },
//   {
//     text: 'they went to the bathroom and never came back :(',
//     rating: 1
//   },
//   {
//     text: 'can\'t wait to spend the rest of our lives together!',
//     rating: 5
//   }
// ]