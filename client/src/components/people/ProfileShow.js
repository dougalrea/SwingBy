/* eslint-disable no-unused-vars */
import React from 'react'
import { getOnePerson } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Button, Stack, Badge, FormControl,
  FormLabel, FormErrorMessage, FormHelperText, Input, Avatar, AvatarBadge, Wrap, WrapItem, Divider } from '@chakra-ui/react'

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
        <Box
          m={50}
          border='2px'
          borderColor='gray.200'>
          <Flex direction='column'>
            <Flex>
              <Box p='2'>
                <Heading m='5' as='h1'size='xl'>{person.firstName} {person.surname}</Heading>
              </Box>
              <Spacer />
              <box>
                <Button m={5}>Like</Button>
                <Button m={5}>Follow</Button>
              </box>
            </Flex>
            <Flex>
              <Box
                flexGrow={2}
                w='350px'
                rounded='20px'
                boxShadow='sm'
                key={person._id}>
                <Image p={5} align='left'rounded='40px'src={person.profilePicture} />
              </Box>
              <Box flexGrow={1} direction='column'm={5} p={5}>
                <Text>Age: {person.age}</Text>
                <Text>Gender: {person.gender}</Text>
                <Text>Sexual Orientation: {person.sexualOrientation}</Text>
                <Text>Politics: {person.politics}</Text>
                <Text>Height: {person.height}</Text>
                <Text>Smoker: {person.isSmoker}</Text>
                <Text>Open to drugs: {person.isOpenToDrugs}</Text>
                <Text>Food Preferences: {person.foodPreferences}</Text>
              </Box>
              <Box flexGrow={1}>
                <Text>Reviews go here</Text>
              </Box>
              <box flexGrow={1}>
                <Wrap border='2px' m={5}>
                  <WrapItem>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                  </WrapItem>
                  <WrapItem>
                    <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" />
                  </WrapItem>
                  <WrapItem>
                    <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                  </WrapItem>
                  <WrapItem>
                    <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                  </WrapItem>
                  <WrapItem>
                    <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
                  </WrapItem>
                  <WrapItem>
                    <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
                  </WrapItem>
                  <WrapItem>
                    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                  </WrapItem>
                </Wrap>
              </box>
            </Flex>
            <Stack isInline align='baseline'>
              <Box ml={5} justify='space-around'>
                <Badge variant='solid' variantColor='white' rounded='full' px={2}>New Profile</Badge>
                <Badge m={1} variant='solid' variantColor='white' rounded='full' px={2}>Hosting Dinner</Badge>
                <Badge m={1} variant='solid' variantColor='white' rounded='full' px={2}>{person.interests[0]}</Badge>
                <Badge m={1} variant='solid' variantColor='white' rounded='full' px={2}>{person.interests[1]}</Badge>
                <Badge m={1} variant='solid' variantColor='white' rounded='full' px={2}>{person.interests[2]}</Badge>
                <Badge m={1} variant='solid' variantColor='white' rounded='full' px={2}>{person.interests[3]}</Badge>
              </Box>
            </Stack>
            <Divider p={2}/>
            <Flex bg='.200'>
              <Text p={5}>Hello gents – thanks for stopping by. I’m a creative, fun-loving, energetic and active girl whose favourite words – in any language – are ‘Please proceed to your gate for departure’. I’ve been bitten HARD by the travel bug and have been lucky enough to visit every continent (well, I’m working on Antarctica). I love going out, meeting new people and generally getting the most out of life – whether that’s trying new bars and restaurants or picking up a new sport (I once joined in a game of pick-up basketball with a group of kids in Zimbabwe – it was great!) You should shoot me a message if you’re fun-loving, fit, and up for anything – I am.</Text>
            </Flex>
            <Box w='500px' m={3} p={3}>
              <FormControl>
                <FormLabel>Contact {person.firstName}</FormLabel>
                <Input bg='blue.200' type='email' />
                <FormHelperText>Say hello or ask a question</FormHelperText>
              </FormControl>
            </Box>
            <Flex
              justify='space-between'>
              <Box
                w='350px'
                rounded='20px'
                boxShadow='sm'>
                <Image p={5} align='left'rounded='40px'src={person.profilePicture} />
              </Box>
              <Box
                w='350px'
                rounded='20px'
                boxShadow='sm'>
                <Image p={5} align='left'rounded='40px'src={person.profilePicture} />
              </Box>
              <Box
                w='350px'
                rounded='20px'
                boxShadow='sm'>
                <Image p={5} align='left'rounded='40px'src={person.profilePicture} />
              </Box>
            </Flex>
            <Divider orientation="horizontal" />
          </Flex>
        </Box>
        :
        <Text>...loading</Text>
      }
    </>
  )
}

export default ProfileShow