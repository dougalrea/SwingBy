function daysFromNow(x) {
  const now = new Date().getTime()
  const eventTime = Number(now) + (86400000 * x)
  return eventTime
}

function randomCapacity() {
  return Math.floor(Math.random() * 18) + 2
}

export default [
  {
    name: 'test event 1',
    longitude: -0.064,
    latitude: 51.507,
    startDateTime: new Date(daysFromNow(-3)),
    maxCapacity: randomCapacity(),
    attendees: [],
    comments: []
  },
  {
    name: 'test event 2',
    longitude: -0.213640, 
    latitude: 51.475230,
    startDateTime: new Date(daysFromNow(21)),
    maxCapacity: randomCapacity(),
    attendees: [],
    comments: []
  },
  {
    name: 'test event 3',
    longitude: -0.143240,
    latitude: 51.537740,
    startDateTime: new Date(daysFromNow(-7)),
    maxCapacity: randomCapacity(),
    attendees: [],
    comments: []
  },
  {
    name: 'test event 4',
    longitude: -0.209670,
    latitude: 51.510720,
    startDateTime: new Date(daysFromNow(2)),
    maxCapacity: randomCapacity(),
    attendees: [],
    comments: []
  },
  {
    name: 'test event 5',
    longitude: 0.005540,
    latitude: 51.509240,
    startDateTime: new Date(daysFromNow(-1)),
    maxCapacity: randomCapacity(),
    attendees: [],
    comments: []
  },
  {
    name: 'test event 6',
    longitude: -0.042340,
    latitude: 51.472599,
    startDateTime: new Date(daysFromNow(40)),
    maxCapacity: randomCapacity(),
    attendees: [],
    comments: []
  }
]