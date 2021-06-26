import faker from 'faker'

function realisticStartDateTime(date) {
  date.setMinutes(15 * Math.round(date.getMinutes() / 15), 0, 0)
  if (date.getDay() === 6 || date.getDay() === 0) {
    if (date.getHours() < 9) {
      date.setHours(9 + Math.floor(Math.random() * (24 - 9)))
    }
  } else {
    if (date.getHours() < 17) {
      date.setHours(17 + Math.floor(Math.random() * (24 - 17)))
    }
  }
  return date
}

function randomCapacity() {
  return Math.floor(Math.random() * 10) + 2
}

function generateEvents() {
  const events = []

  for (let i = 0; i < 100; i++) {
    const name = faker.internet.domainWord()
    const imageURL = `${faker.image.nature()}?random=${Math.round(Math.random() * 1000)}`
    const latitude = Math.random() * 0.235503 + 51.386897
    const longitude = Math.random() * -0.515339 + 0.149425
    const startDateTime = Math.random() < 0.5 ?
      realisticStartDateTime(faker.date.recent(60))
      :
      realisticStartDateTime(faker.date.soon(60)) 
    const duration = Math.floor(Math.random() * 5) + 1
    const types = faker.lorem.words(4)
    const description = faker.lorem.sentences(5)
    const capacity = randomCapacity()
  
    events.push({
      name,
      imageURL,
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
      startDateTime,
      duration,
      types,
      description,
      capacity,
      attendees: [],
      comments: []
    })
  }
  
  return events
}

const eventData = generateEvents()

export default eventData