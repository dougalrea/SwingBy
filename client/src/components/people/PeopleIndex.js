import React from 'react'
import { getAllPeople } from '../../lib/api'
import { Box, Image, Badge, Text, Wrap, Heading, Stack, ChakraProvider, Spacer } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { Link } from 'react-router-dom'

function PeopleIndex() {
  const [people, setPeople] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllPeople()
        setPeople(data)
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
      {people ?
        <Box m={50}>
          <Wrap justify='center'>
            {people.map(person => (
              <Box
                w='300px' 
                m={50}
                rounded='20px'
                boxShadow='sm' 
                bg='pink.800'
                color='white'
                key={person._id}>
                <Link to={`/people/${person._id}`}>
                  <Image border='1px' borderColor='pink.800' bg='white' p={5} roundedTop='20px' src={person.profilePicture} alt={person.firstName} />
                  <Box p={5}>
                    <Stack isInline align='baseline'>
                      <Badge colorScheme='purple' rounded='full' px={2}>New Profile</Badge>
                      <Badge m={1} colorScheme='green' rounded='full' px={2}>Hosting Event</Badge>
                    </Stack>
                    <Heading as='h2' fontSize='36px' m={2} fontWeight='bold' letterSpacing='wide'>{person.firstName.toUpperCase()}</Heading>
                    <Text isTruncated fontSize='sm' fontWeight='light' letterSpacing='wide'>Hello gents – thanks for stopping by.<br /> I’m a creative, fun-loving, energetic <br />and active girl whose favourite words – in any language – are ‘Please proceed to your gate for departure’. I’ve been bitten HARD by the travel bug and have been lucky enough to visit every continent (well, I’m working on Antarctica). I love going out, meeting new people and generally getting the most out of life – whether that’s trying new bars and restaurants or picking up a new sport (I once joined in a game of pick-up basketball with a group of kids in Zimbabwe – it was great!) You should shoot me a message if you’re fun-loving, fit, and up for anything – I am.
                    </Text>
                    <Box justify='space-around' as='span'>
                      <Stack isInline align='center'>
                        {Array(5)
                          .fill('')
                          .map((_, i)=> (
                            <StarIcon color='gold' key={i} />
                          ))}
                        <StarIcon color='white'/>
                        <Spacer />
                        <Text as='h3' 
                          fontSize='lg' 
                          fontWeight='semiobold'
                          p={1}
                        >{person.reviews.length} Reviews</Text>
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

export default PeopleIndex