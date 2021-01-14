import React from 'react'
import { getAllPeople } from '../../lib/api'
import { Box, Image, Badge, Text, Wrap, Heading, Stack, ChakraProvider, Spacer, Spinner } from '@chakra-ui/react'
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
      body: 'system-ui, sans-serif'
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
                      <Badge colorScheme='purple' rounded='full' px={2}>{person.alias}</Badge>
                      <Badge m={1} colorScheme='green' rounded='full' px={2}>Age: {person.age}</Badge>
                    </Stack>
                    <Heading as='h2' fontSize='36px' my={2} fontWeight='bold' letterSpacing='wide'>{person.firstName}</Heading>
                    <Text isTruncated fontSize='sm' fontWeight='light' letterSpacing='wide'>Bio: {person.bio}
                    </Text>
                    <Box justify='space-around' as='span'>
                      <Stack isInline align='center'>
                        <Heading color='white' size='lg' mt={2}> {`${Number(person.avgRating) ?
                          (person.avgRating.toPrecision(2)) : ' Not Rated'}`}
                    
                        {!!Number(person.avgRating) &&
                                        <StarIcon mb={3} ml={1} color='gold'/>
                        }
                        </Heading>
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
        <Box m={40} align='center'>
          <Spinner size='xl' color='pink.800' />
          <Heading color='black'>Loading...</Heading>
        </Box>
      }
    </ChakraProvider>
  )
}

export default PeopleIndex