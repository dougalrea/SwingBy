/* eslint-disable no-unused-vars */
import React from 'react'
import { getAllEvents } from '../../lib/api'
import { ChakraProvider, Heading, Wrap, Box, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Badge } from '@chakra-ui/react'
import EventCard from '../../components/events/EventCard'
import Fonts from '../../styles/Fonts'
import { extendTheme } from '@chakra-ui/react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { getPayload } from '../../lib/auth'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'system-ui, sans-serif'
  }
})

function EventsIndex() {
  const [events, setEvents] = React.useState(null)
  const [viewport, setViewport] = React.useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 9
  })
  const [popupData, setPopupData] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllEvents()
        setEvents(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const availableEvents = events ? events.filter(event => {
    return !event.hasExpired && event.attendees.length < event.capacity && event.owner._id !== getPayload().sub
  }).sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()) : null

  const previousHostedEvents = events ? events.filter(event => {
    return event.hasExpired && event.owner._id === getPayload().sub
  }).sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()) : null

  const upcomingHostingEvents = events ? events.filter(event => {
    return !event.hasExpired && event.owner._id === getPayload().sub
  }).sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()) : null

  const previousAttendedEvents = events ? events.filter(event => {
    return event.hasExpired && event.attendees.some(attendee => attendee._id === getPayload().sub) &&
      event.owner._id !== getPayload().sub
  }).sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()) : null

  const upcomingAttendingEvents = events ? events.filter(event => {
    return !event.hasExpired && event.attendees.some(attendee => attendee._id === getPayload().sub) &&
      event.owner._id !== getPayload().sub
  }).sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()) : null

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Heading
        align='center'
        m={5} as='h1'
        fontSize='96px'
        color='pink.800'
      >
        SwingBy
      </Heading>
      {availableEvents ? 
        <Box m={50}>
          <Tabs variant='enclosed' align='center' isFitted>
            <TabList>
              <Tab>Event List</Tab>
              <Tab>Map View</Tab>
              <Tab>Events Hosting</Tab>
              <Tab>Events Attending</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Wrap justify='center'>
                  {availableEvents.map(event => (
                    <EventCard key={event._id} {...event}/>
                  ))}
                </Wrap>
              </TabPanel>
              <TabPanel
                maxW='100%'
                w='85vw' 
                h='65vh'
                mt={2}
                borderWidth='1px' 
                borderRadius='lg'
                borderColor='gray.500'
              >
                <ReactMapGL
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  height="100%"
                  width="100%"
                  mapStyle='mapbox://styles/mapbox/outdoors-v11'
                  latitude={viewport.latitude}
                  longitude={viewport.longitude}
                  zoom={viewport.zoom}
                  onViewportChange={viewport => {
                    setViewport(viewport)
                    setPopupData(null)
                  }}
                >
                  {availableEvents &&
                    availableEvents.map(event => (
                      <Marker
                        key={event._id}
                        latitude={Number(event.latitude)}
                        longitude={Number(event.longitude)}
                      >
                        <span onClick={() => {
                          setPopupData(event)
                          console.log(popupData)
                        }}
                        >
                          🎯
                        </span>
                      </Marker>
                    ))
                  }
                  {popupData &&
                    <Popup
                      latitude={Number(popupData.latitude)}
                      longitude={Number(popupData.longitude)}
                      closeButton={false}
                    >
                      <div style={{ width: '100px' }}>
                        <img src={popupData.imageURL} style={{ width: '100%', height: 'auto' }}/>
                      </div>
                      <p className="event-name">
                        <Link  to={`/events/${popupData._id}`}>
                          {popupData.name.toUpperCase()}
                        </Link>
                      </p>
                      <p className="event-types">{popupData.types.join(' ')}</p>
                      <Badge variant="outline" colorScheme='purple' rounded='full' fontSize='0.6em' mr={2}> 
                        {new Date(popupData.startDateTime).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline" colorScheme='green' rounded='full' fontSize='0.6em'>
                        {new Date(popupData.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Badge>
                      <p className="event-spaces">
                        {popupData.capacity - popupData.attendees.length}/{popupData.capacity} spaces remaining
                      </p>
                      <p className="event-host">
                        hosted by <Link to={`/people/${popupData.owner._id}`}>
                          {popupData.owner.firstName}
                        </Link>
                      </p>
                    </Popup>
                  }
                </ReactMapGL>
              </TabPanel>
              <TabPanel>
                <Tabs variant='soft-rounded' align='center' defaultIndex={1}>
                  <TabList>
                    <Tab _selected={{ color: 'red.700', bg: 'red.300', borderColor: 'red.700' }}>
                      Previous
                    </Tab>
                    <Tab _selected={{ color: 'green.700', bg: 'green.300', borderColor: 'green.700' }}>
                      Upcoming
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Wrap justify='center'>
                        {previousHostedEvents.map(event => (
                          <EventCard key={event._id} {...event}/>
                        ))}
                      </Wrap>
                    </TabPanel>
                    <TabPanel>
                      <Wrap justify='center'>
                        {upcomingHostingEvents.map(event => (
                          <EventCard key={event._id} {...event}/>
                        ))}
                      </Wrap>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
              <TabPanel>
                <Tabs variant='soft-rounded' align='center' defaultIndex={1}>
                  <TabList>
                    <Tab _selected={{ color: 'red.700', bg: 'red.300', borderColor: 'red.700' }}>
                      Previous
                    </Tab>
                    <Tab _selected={{ color: 'green.700', bg: 'green.300', borderColor: 'green.700' }}>
                      Upcoming
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Wrap justify='center'>
                        {previousAttendedEvents.map(event => (
                          <EventCard key={event._id} {...event}/>
                        ))}
                      </Wrap>
                    </TabPanel>
                    <TabPanel>
                      <Wrap justify='center'>
                        {upcomingAttendingEvents.map(event => (
                          <EventCard key={event._id} {...event}/>
                        ))}
                      </Wrap>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        :
        <Box m={40} align='center'>
          <Spinner size='xl' color='pink.800' />
          <Heading color='black'>Loading...</Heading>
        </Box>
      }
    </ChakraProvider>
  )
}

export default EventsIndex