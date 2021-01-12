
/* eslint-disable no-unused-vars */
import React from 'react'
import { getOnePerson } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Button, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, AvatarBadge, Wrap, WrapItem, Grid, GridItem } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'Raleway'
  }
})

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
      <ChakraProvider theme={theme}>
        <Fonts />
        <Heading align='center' as='h1' fontSize='96px' color='pink.800'>SwingBy</Heading>
        {person ?
          <Box
            m={50}>
            <Flex direction='column'>
              <Flex>
                <Box p='2'>
                  <Heading m='5' as='h1'size='xl'>{person.firstName} {person.surname}</Heading>
                </Box>
                <Spacer />
              </Flex>
              <Box ml={5} mr={5}>
                <Center height="50px">
                  <Divider orientation="horizontal" />
                </Center>
              </Box >
              <Flex>
                <Box
                  w='350px'
                  rounded='20px'
                  key={person._id}>
                  <Image boxShadow='lg' m={2} p={5} align='left'rounded='40px'src={person.profilePicture} />
                </Box>
                <Box border='5px' direction='column'm={5} p={5}>
                  <Heading size='20px'>Age: {person.age}</Heading>
                  <Heading size='20px'>Gender: {person.gender}</Heading>
                  <Heading size='20px'>Sexual Orientation: {person.sexualOrientation}</Heading>
                  <Heading size='20px'>Politics: {person.politics}</Heading>
                  <Heading size='20px'>Height: {person.height}</Heading>
                  <Heading size='20px'>Smoker: {person.isSmoker}</Heading>
                  <Heading size='20px'>Open to drugs: {person.isOpenToDrugs}</Heading>
                  <Heading size='20px'>Food Preferences: {person.foodPreferences}</Heading>
                </Box>
              </Flex>
              <Box ml={5} mr={5}>
                <Center height="50px">
                  <Divider orientation="horizontal" />
                </Center>
              </Box >
              <Box m={5}>
                <Heading>A little bit about me...</Heading>
              </Box>
              <Box flexGrow='1'>
                <Text p={5}>Hello gents – thanks for stopping by. I’m a creative, fun-loving, energetic and active girl whose favourite words – in any language – are ‘Please proceed to your gate for departure’. I’ve been bitten HARD by the travel bug and have been lucky enough to visit every continent (well, I’m working on Antarctica). I love going out, meeting new people and generally getting the most out of life – whether that’s trying new bars and restaurants or picking up a new sport (I once joined in a game of pick-up basketball with a group of kids in Zimbabwe – it was great!) You should shoot me a message if you’re fun-loving, fit, and up for anything – I am.</Text>
              </Box>
              <Box ml={5} mr={5}>
                <Center height="50px">
                  <Divider orientation="horizontal" />
                </Center>
              </Box >
              <Box m={5}>
                <Heading>Interests</Heading>
              </Box>
              <Stack isInline align='baseline'>
                <Box ml={5} justify='space-around'>
                  <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[0]}</Badge>
                  <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[1]}</Badge>
                  <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[2]}</Badge>
                </Box>
              </Stack>
              <Box ml={5} mr={5}>
                <Center height="50px">
                  <Divider orientation="horizontal" />
                </Center>
              </Box>
              <Box ml={5} mr={5}>
                <Heading>Photo Gallery</Heading>
              </Box>
              <Flex>
                <Box m={5}>
                  <Image src={person.eventsHostOf[0].imageURL} />
                </Box>
                <Box m={5}>
                  <Image src={person.eventsHostOf[0].imageURL} />
                </Box>
                <Box m={5}>
                  <Image src={person.eventsHostOf[0].imageURL} />
                </Box>
              </Flex>
              <Box ml={5} mr={5}>
                <Center height="50px">
                  <Divider orientation="horizontal" />
                </Center>
              </Box>
              <Box w='600px'm={5}>
                <FormControl id="email">
                  <FormLabel>Contact {person.firstName}</FormLabel>
                  <Input type="email" />
                  <FormHelperText>Say hi or ask a question about an upcoming event</FormHelperText>
                </FormControl>
              </Box>
            </Flex>
            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box >
          </Box>
          :
          <Text>...loading</Text>
        }
      </ChakraProvider>
    </>
  )
}

export default ProfileShow
 