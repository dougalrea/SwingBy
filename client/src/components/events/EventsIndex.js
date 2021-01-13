import React from 'react'
import { getAllEvents } from '../../lib/api'
import { ChakraProvider, Heading, Wrap, Box, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react'
import EventCard from '../../components/events/EventCard'
import EventMapIndexCard from '../../components/events/EventMapIndexCard'
import Fonts from '../../styles/Fonts'
import { extendTheme } from '@chakra-ui/react'


function EventsIndex() {
  const [events, setEvents] = React.useState(null)

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

  const theme = extendTheme({
    fonts: {
      heading: 'Dancing Script',
      body: 'Raleway'
    }
  })

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Heading align='center' m={5} as='h1' fontSize='96px' color='pink.800'>SwingBy</Heading>
      {events ? 
        <Box m={50}>
          <Tabs>
            <TabList>
              <Tab>Event List</Tab>
              <Tab>Map View</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Wrap justify='center'>
                  {events.map(event => (
                    <EventCard key={event._id} {...event}/>
                  ))}
                </Wrap>
              </TabPanel>
              <TabPanel>
                <EventMapIndexCard />
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