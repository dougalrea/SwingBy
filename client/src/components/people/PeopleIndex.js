import React from 'react'
import { getAllPeople } from '../../lib/api'
import { Box, Image, Badge, Text, Wrap, Heading, Stack } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

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

  return (
    <>
      <Heading align='center'as='h1'size='4xl'>Profile Index</Heading>
      {people ?
        <Box>
          <Wrap>
            {people.map(person => (
              <Box
                w='300px' 
                m={5}
                rounded='20px'
                boxShadow='sm' 
                bg='gray.200'
                key={person._id}>
                <Image roundedTop='20px' src={person.profilePicture} alt={person.firstName} />
                <Box p={5}>
                  <Stack isInline align='baseline'>
                    <Badge variant='solid' variantColor='white' rounded='full' px={2}>New Profile</Badge>
                    <Badge m={1} variant='solid' variantColor='white' rounded='full' px={2}>Hosting Event</Badge>
                  </Stack>
                  <Text as='h2'fontSize='lg' fontWeight='bold' letterSpacing='wide'>{person.firstName} {person.surname}</Text>
                  <Text isTruncated fontSize='sm' fontWeight='light' letterSpacing='wide'>Hello gents – thanks for stopping by.<br /> I’m a creative, fun-loving, energetic <br />and active girl whose favourite words – in any language – are ‘Please proceed to your gate for departure’. I’ve been bitten HARD by the travel bug and have been lucky enough to visit every continent (well, I’m working on Antarctica). I love going out, meeting new people and generally getting the most out of life – whether that’s trying new bars and restaurants or picking up a new sport (I once joined in a game of pick-up basketball with a group of kids in Zimbabwe – it was great!) You should shoot me a message if you’re fun-loving, fit, and up for anything – I am.
                  </Text>
                  <Box as='span'>
                    {Array(3)
                      .fill('')
                      .map((_, i)=> (
                        <StarIcon key={i} />
                      ))}
                    <StarIcon color='white'/>
                    <Text as='h3' 
                      fontSize='lg' 
                      fontWeight='semiobold'
                      p={1}
                    >5 Reviews</Text>
                  </Box>
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

export default PeopleIndex