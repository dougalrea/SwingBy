function newDate(x) {
  const now =  new Date().getTime()
  const eventTime = Number(now) + (86400000 * x)
  return new Date(eventTime).toLocaleDateString()
}

function randomCapacity() {
  return Math.floor(Math.random() * 18) + 2
}

console.log(newDate(60))

export default [
  {
    name: 'test event 1',
    longitude: -0.064,
    latitude: 51.507,
    startDateTime: newDate(14),
    maxCapacity: randomCapacity(),
    attendees: []
  },
  {
    name: 'test event 2',
    longitude: -0.213640, 
    latitude: 51.475230,
    startDateTime: newDate(21),
    maxCapacity: randomCapacity(),
    attendees: []
  },
  {
    name: 'test event 3',
    longitude: -0.143240,
    latitude: 51.537740,
    startDateTime: newDate(-7),
    maxCapacity: randomCapacity(),
    attendees: []
  },
  {
    name: 'test event 4',
    longitude: -0.209670,
    latitude: 51.510720,
    startDateTime: newDate(2),
    maxCapacity: randomCapacity(),
    attendees: []
  },
  {
    name: 'test event 5',
    longitude: 0.005540,
    latitude: 51.509240,
    startDateTime: newDate(-1),
    maxCapacity: randomCapacity(),
    attendees: []
  },
  {
    name: 'test event 6',
    longitude: -0.042340,
    latitude: 51.472599,
    startDateTime: newDate(60),
    maxCapacity: randomCapacity(),
    attendees: []
  }
]