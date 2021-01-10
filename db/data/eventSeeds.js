/* eslint-disable no-unused-vars */
import faker from 'faker'


function randomCapacity() {
  return Math.floor(Math.random() * 18) + 2
}

const typesArray = []


function generateEvents() {
  const events = []

  for (let i = 1; i <= 60; i++) {
    const name = faker.internet.domainWord()
    const imageUrl = faker.image.nightlife()
    const latitude = Math.random() * -0.515339 + 0.149425
    const longitude = Math.random() * 0.235503 + 51.386897
    const startDateTime = Math.random() < 0.5 ? faker.date.recent(60) : faker.date.soon(60)
    const duration = Math.floor(Math.random() * 5) + 1
    const types = faker.lorem.words(4)
    const description = faker.lorem.sentences(5)
    const maxCapacity = randomCapacity()
  
    events.push(
      {
        'name': name,
        'imageURL': imageUrl,
        'latitude': latitude,
        longitude: longitude,
        'startDateTime': startDateTime,
        'duration': duration,
        'types': types,
        'description': description,
        'maxCapacity': maxCapacity,
        'attendees': [],
        'comments': []
      }
    )
  }
  return events
}

const eventsDataObj = generateEvents()
console.log(eventsDataObj)
export default eventsDataObj

// export default [
//   {
//     name: 'test event 1',
//     longitude: -0.064,
//     latitude: 51.507,
//     startDateTime: new Date(daysFromNow(-3)),
//     maxCapacity: randomCapacity(),
//     attendees: [],
//     comments: []
//   },
//   {
//     name: 'test event 2',
//     longitude: -0.213640, 
//     latitude: 51.475230,
//     startDateTime: new Date(daysFromNow(21)),
//     maxCapacity: randomCapacity(),
//     attendees: [],
//     comments: []
//   },
//   {
//     name: 'test event 3',
//     longitude: -0.143240,
//     latitude: 51.537740,
//     startDateTime: new Date(daysFromNow(-7)),
//     maxCapacity: randomCapacity(),
//     attendees: [],
//     comments: []
//   },
//   {
//     name: 'test event 4',
//     longitude: -0.209670,
//     latitude: 51.510720,
//     startDateTime: new Date(daysFromNow(2)),
//     maxCapacity: randomCapacity(),
//     attendees: [],
//     comments: []
//   },
//   {
//     name: 'test event 5',
//     longitude: 0.005540,
//     latitude: 51.509240,
//     startDateTime: new Date(daysFromNow(-1)),
//     maxCapacity: randomCapacity(),
//     attendees: [],
//     comments: []
//   },
//   {
//     name: 'test event 6',
//     longitude: -0.042340,
//     latitude: 51.472599,
//     startDateTime: new Date(daysFromNow(40)),
//     maxCapacity: randomCapacity(),
//     attendees: [],
//     comments: []
//   }
// ]