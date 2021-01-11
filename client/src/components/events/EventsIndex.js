import React from 'react'
import { getAllEvents } from '../../lib/api'
import { Box, Heading, Wrap, Image, Stack, Badge, Text } from '@chakra-ui/react'
import { StarIcon, InfoIcon, EmailIcon, DeleteIcon } from '@chakra-ui/icons'

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
  return (
    <>
      <Heading align='center' as='h1' size='4xl'>Event Index</Heading>
      {events ? 
        <Box m={50}>
          <Wrap justify='center'>
            {events.map(event => (
              <Box 
                w='300px' 
                m={50} rounded='20px' 
                boxShadow='sm' 
                bg='gray.200' 
                key={event._id}>
                <Image m='2px' src='https://thumbor.thedailymeal.com/vf6fiMOka04qTngQRwtRwKL9bGQ=/870x565/https://www.thedailymeal.com/sites/default/files/2016/04/04/00_Intro_Slide.jpg' alt={event.name} />
                <Box p={5}>
                  <Stack isInline align='baseline'>
                    <Badge variant='solid' rounded='full' px={2}> 
                      {event.startDateTime}
                    </Badge>
                    <Badge variant='solid' rounded='full' ps={2}>New Event</Badge>
                  </Stack>
                  <Text isTruncated>{event.types[0]}</Text>
                  <Box as='span'>
                    {Array(2)
                      .fill('')
                      .map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    <StarIcon color='white.200' />
                    <Text as='h3' fontSize='lg' fontWeight='semibold' p={1}>5 Reviews</Text>
                  </Box>
                  <Stack m='auto' isInline justify='space-between'>
                    <Box>
                      <InfoIcon m={4}/>
                      <EmailIcon />
                    </Box>
                    <DeleteIcon />
                  </Stack>
                </Box>
              </Box>
            ))}
          </Wrap>
        </Box>
        :
        <h2>...loading</h2>
      }
    </>
  )
}

export default EventsIndex