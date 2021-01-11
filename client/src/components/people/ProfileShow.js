/* eslint-disable no-unused-vars */
import React from 'react'
import { getOnePerson } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Container, Image, Stack, Flex } from '@chakra-ui/react'

function ProfileShow() {
  const [person, setPerson] = React.useState(null)
  const { id } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getOnePerson(id)
        setPerson(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  return (
    <>
      <Heading align='center' as='h1' size='4xl' m={10}>Person Show Page</Heading>
      {person ?
        <Container
          border='2px'
          borderColor='gray.200'>
          <Flex>
            <Box p={5}>
              <Heading as='h1'size='xl'>{person.firstName} {person.surname}</Heading>
            </Box>
            <Stack isInline>
              <Box
                rounded='20px'
                boxShadow='sm'
                key={person._id}>
                <Image align='left' rounded='20px'src={person.profilePicture} />
              </Box>
              <Box p={5}>
                <Text>Age: {person.age}</Text>
                <Text>Gender: {person.gender}</Text>
                <Text>Sexual Orientation: {person.sexualOrientation}</Text>
                <Text>Politics: {person.politics}</Text>
                <Text>Height: {person.height}</Text>
                <Text>Smoker: {person.isSmoker}</Text>
                <Text>Interests: {person.interests}</Text>
                <Text>Open to drugs: {person.isOpenToDrugs}</Text>
                <Text>Food Preferences: {person.foodPreferences}</Text>
              </Box>
            </Stack>
            <Box bg='.200'>
              <Text p={5}>Hello gents – thanks for stopping by. I’m a creative, fun-loving, energetic and active girl whose favourite words – in any language – are ‘Please proceed to your gate for departure’. I’ve been bitten HARD by the travel bug and have been lucky enough to visit every continent (well, I’m working on Antarctica). I love going out, meeting new people and generally getting the most out of life – whether that’s trying new bars and restaurants or picking up a new sport (I once joined in a game of pick-up basketball with a group of kids in Zimbabwe – it was great!) You should shoot me a message if you’re fun-loving, fit, and up for anything – I am.</Text>
            </Box>
          </Flex>
          <Flex>
            <Text>Hello gents – thanks for stopping by. I’m a creative, fun-loving, energetic and active girl whose favourite words – in any language – are ‘Please proceed to your gate for departure’. I’ve been bitten HARD by the travel bug and have been lucky enough to visit every continent (well, I’m working on Antarctica). I love going out, meeting new people and generally getting the most out of life – whether that’s trying new bars and restaurants or picking up a new sport (I once joined in a game of pick-up basketball with a group of kids in Zimbabwe – it was great!) You should shoot me a message if you’re fun-loving, fit, and up for anything – I am.</Text>
            
          </Flex>
        </Container>
        :
        <Text>...loading</Text>
      }
    </>
  )
}

export default ProfileShow