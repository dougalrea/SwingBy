import React from 'react'
import { getAllEvents } from '../../lib/api'
import { Box, Heading, Wrap, Image, Stack, Badge, Text, ChakraProvider, Spacer, Avatar } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { Link } from 'react-router-dom'

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
          <Wrap justify='center'>
            {events.map(event => (
              <Box 
                w='300px' 
                m={50} rounded='20px'  
                color='white'
                bg='pink.800' 
                key={event._id}>
                <Link to={`/events/${event._id}`}>
                  <Box m={2}>
                    <Heading>Host <Link to={`/people/${event.owner}`}> <Avatar src={event.owner.profilePicture}></Avatar></Link></Heading>
                  </Box>
                  <Image rounded='20px' borderColor='pink.800' p={5} bg='white' src={event.imageURL} alt={event.name} />
                  <Box p={5}>
                    <Stack isInline align='baseline'>
                      <Badge colorScheme='purple' rounded='full' px={2}> 
                        {event.startDateTime.slice(0, 10)}
                      </Badge>
                      <Badge colorScheme='green' rounded='full' ps={2}>{event.startDateTime.slice(15, 21) + ' pm'}</Badge>
                    </Stack>
                    <Heading as='h2' fontSize='36px' mt={3} fontWeight='bold' letterSpacing='wide'>{event.name.toUpperCase()}</Heading>
                    <Box justify='space-around' as='span'>
                      <Stack isInline align='center'>
                        {Array(3)
                          .fill('')
                          .map((_, i)=> (
                            <StarIcon mt={1} color='gold' key={i} />
                          ))}
                        <StarIcon color='white'/>
                        <Spacer />
                        <Text m={1}>{event.capacity - event.attendees.length + 1} Tickets left</Text>
                      </Stack>
                    </Box>
                    <Box>
                      <Stack isInline align='center'>
                        <Spacer />
                        <Text m={1}>Duration: {event.duration} Hours</Text>
                      </Stack>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Wrap>
        </Box>
        :
        <h2>...loading</h2>
      }
    </ChakraProvider>
  )
}

export default EventsIndex