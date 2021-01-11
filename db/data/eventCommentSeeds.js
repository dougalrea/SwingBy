import faker from 'faker'

function generateEventComments() {
  const eventComments = []
  for (let i = 1; i <= 240; i++) {
    const text = faker.lorem.sentences(2)
    eventComments.push(
      {
        text
      })
  }
  return eventComments
}

const eventsCommentsData = generateEventComments()

export default eventsCommentsData


// export default [
//   {
//     text: 'looks great, can\'t wait',
//   },
//   {
//     text: 'wow'
//   },
//   {
//     text: 'looks terrible won\'t go'
//   },
//   {
//     text: 'can i bring my auntie?'
//   },
//   {
//     text: 'will there be snacks im hungry'
//   },
//   {
//     text: 'is this a latex friendly event?'
//   },
//   {
//     text: 'I\'m allergic to bees'
//   }
// ]