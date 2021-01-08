function newDate(x) {
  const now =  new Date().getTime()
  const eventTime = Number(now) + (86400000 * x)
  return new Date(eventTime).toLocaleDateString()
}

console.log(newDate(60))

export default [
  {
    name: 'test event 1',
    location: 'a postcode',
    date: newDate(14)
  },
  {
    name: 'test event 2',
    location: 'a postcode',
    date: newDate(21)
  },
  {
    name: 'test event 3',
    location: 'a postcode',
    date: newDate(-7)
  },
  {
    name: 'test event 4',
    location: 'a postcode',
    date: newDate(2)
  },
  {
    name: 'test event 5',
    location: 'a postcode',
    date: newDate(-1)
  },
  {
    name: 'test event 6',
    location: 'a postcode',
    date: newDate(60)
  }
]