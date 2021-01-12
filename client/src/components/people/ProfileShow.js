
/* eslint-disable no-unused-vars */
import React from 'react'
import { getOnePerson } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Button, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center } from '@chakra-ui/react'
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
              <box>
                <Button bg='pink.800' color='white' m={5}>Like</Button>
                <Button bg='pink.800' color='white' m={5}>Follow</Button>
              </box>
            </Flex>
            <Flex>
              <Box
                w='350px'
                rounded='20px'
                boxShadow='sm'
                key={person._id}>
                <Image p={5} align='left'rounded='20px'src={person.profilePicture} />
              </Box>
              <Box direction='column'm={5} p={5}>
                <Text>Age: {person.age}</Text>
                <Text>Gender: {person.gender}</Text>
                <Text>Sexual Orientation: {person.sexualOrientation}</Text>
                <Text>Politics: {person.politics}</Text>
                <Text>Height: {person.height}</Text>
                <Text>Smoker: {person.isSmoker}</Text>
                <Text>Open to drugs: {person.isOpenToDrugs}</Text>
                <Text>Food Preferences: {person.foodPreferences}</Text>
              </Box>
              <Box>
                <Text>Reviews go here</Text>
              </Box>
            </Flex>
            <Stack isInline align='baseline'>
              <Box ml={5} justify='space-around'>
                <Badge variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>New Profile</Badge>
                <Badge m={1} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>Hosting Dinner</Badge>
                <Badge m={1} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[0]}</Badge>
                <Badge m={1} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[1]}</Badge>
                <Badge m={1} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[2]}</Badge>
                <Badge m={1} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[3]}</Badge>
              </Box>
            </Stack>
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
            </Box>
            <Box ml={5} mr={5}>
              <Heading>Photo Gallery</Heading>
            </Box>
            <Flex>
              <Box m={5}>
                <Image src='https://cdn.thegentlemansjournal.com/wp-content/uploads/2014/06/DINNER-TGJ-00-900x600-c-center.jpg' />
              </Box>
              <Box m={5}>
                <Image src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dinner-party-1558090194.jpg?crop=1.00xw:0.753xh;0,0.249xh&resize=1200:*' />
              </Box>
              <Box m={5}>
                <Image src='https://www.expatica.com/app/uploads/sites/5/2020/03/Boeuf-bourguignon.jpg' />
              </Box>
            </Flex>
            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box>
            <Flex justify='space-around'>
              <box flexGrow='1'>
                <Button bg='pink.800' color='white' m={5}>Book Event</Button>
              </box>
              <box flexGrow='1'>
                <Button bg='pink.800' color='white' m={5}>Send a request</Button>
              </box>
              <box flexGrow='1'>
                <Button bg='pink.800' color='white' m={5}>Follow</Button>
              </box>

            </Flex>
            <Box m={5}>
              <FormControl id="email">
                <FormLabel>Contact {person.firstName}</FormLabel>
                <Input type="email" />
                <FormHelperText>Say hi or ask a question about an upcoming event</FormHelperText>
              </FormControl>
            </Box>
          </Flex>
        </Box>
        :
        <Text>...loading</Text>
      }
    </ChakraProvider>
  )
}

export default ProfileShow
 