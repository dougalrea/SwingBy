import React from 'react'
import { Box, Heading, Image, Stack, Badge, Text, ChakraProvider, Spacer, Avatar } from '@chakra-ui/react'
// import { StarIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { extendTheme } from '@chakra-ui/react'

function EventCard({ _id, owner, startDateTime, name, capacity, duration, attendees, imageURL }) {

  const theme = extendTheme({
    fonts: {
      heading: 'Dancing Script',
      body: 'system-ui, sans-serif'
    }
  })

  return (
    <ChakraProvider theme={theme}>
      <Box 
        w='300px' 
        m={50} rounded='20px'  
        color='white'
        bg='pink.800' 
        key={_id}>
        <Link to={`/events/${_id}`}>
                  
          <Box m={2}>
            <Heading>Host <Link to={`/people/${owner._id}`}> <Avatar src={owner.profilePicture}></Avatar></Link></Heading>
          </Box>
          <Image rounded='20px' borderColor='pink.800' p={5} bg='white' src={imageURL} alt={name} />
          <Box p={5}>
            <Stack isInline align='baseline'>
              <Badge colorScheme='purple' p={1} align='center'rounded='full' px={2}> 
                {startDateTime.slice(0, 10)}
              </Badge>
              <Badge colorScheme='green' rounded='full' p={1} ps={2}>{startDateTime.slice(15, 21) + ' pm'}</Badge>
            </Stack>
            <Heading my={5} as='h2' fontSize='36px' mt={3} fontWeight='bold' letterSpacing='wide'>{name.toUpperCase()}</Heading>
            <Box my={5} justify='space-around' as='span'>
              <Stack isInline align='center'>
                <Spacer />
                <Text m={1}>🎟 {capacity - attendees.length + 1} Tickets left</Text>
              </Stack>
            </Box>
            <Box>
              <Stack isInline align='center'>
                <Spacer />
                <Text m={1}>Duration: {duration} hours</Text>
              </Stack>
            </Box>
          </Box>
        </Link>
      </Box>
    </ChakraProvider>
  )
}

export default EventCard