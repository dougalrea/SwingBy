import React from 'react'
import { getOneEvent } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'Raleway'
  }
})

function EventShow() {
  const [event, setEvent] = React.useState(null)
  const { id } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getOneEvent(id)
        setEvent(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Box mt={5}>
        <Heading align='center' as='h1' fontSize='96px' color='pink.800'>SwingBy Events</Heading>
      </Box>
      {event ?


        <Box
          m={50}>
          <Flex direction='column'>


            <Flex justify='space-between'>
              <Box>
                <Stack isInline align='center'>
                  <Box p='2'>
                    <Heading m='5' as='h1'size='xl'>{event.name.toUpperCase()} Hosted by: {event.owner.firstName}</Heading>
                  </Box>
                  <Box><Avatar name={event.owner.firstName} src={event.owner.profilePicture}></Avatar></Box>
                </Stack>
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
                key={event._id}>
                <Image boxShadow='lg' m={2} p={5} align='left'rounded='40px'src={event.imageURL} />
              </Box>
              
            </Flex>
            

          



            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box >

  

            <Box m={5}>
              <Heading>Description</Heading>
            </Box>
            <Box flexGrow='1'>
              <Text p={5}>{event.description}</Text>
            </Box>
            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box >

            <Box p='2'>
              <Heading m='5' as='h1'size='xl'>Attending: </Heading>
            </Box>
            <Box m='5'>
              <Stack isInline align='center'>
                <Box><Avatar name={event.owner.firstName} src={event.owner.profilePicture}></Avatar></Box>
                <Box><Avatar name={event.owner.firstName} src={event.owner.profilePicture}></Avatar></Box>
                <Box><Avatar name={event.owner.firstName} src={event.owner.profilePicture}></Avatar></Box>
                <Box><Avatar name={event.owner.firstName} src={event.owner.profilePicture}></Avatar></Box>
                <Box><Avatar name={event.owner.firstName} src={event.owner.profilePicture}></Avatar></Box>
              </Stack>
            </Box>
           

            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box >


            <Box ml={5} mr={5}>
              <Heading>Photo Gallery</Heading>
            </Box>
            <Flex>
              <Box m={5}>
                <Image src={event.imageURL} />
              </Box>
              <Box m={5}>
                <Image src={event.imageURL} />
              </Box>
              <Box m={5}>
                <Image src={event.imageURL} />
              </Box>
            </Flex>

 

            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box>


            <Box m={5}>
              <Heading>Event Type:</Heading>
            </Box>
            <Stack isInline align='baseline'>
              <Box ml={5} justify='space-around'>
                <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>NEW EVENT</Badge>
                <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{event.types[0]}</Badge>
                <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>ADULTS ONLY</Badge>
              </Box>
            </Stack>



            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box>
            <Box w='600px'm={5}>
              <FormControl id="email">
                <FormLabel>Contact</FormLabel>
                <Input type="email" />
                <FormHelperText>Ask a question about an upcoming event</FormHelperText>
              </FormControl>
            </Box>
          </Flex>
          <Box ml={5} mr={5}>
            <Center height="50px">
              <Divider orientation="horizontal" />
            </Center>
          </Box >
          <Box>
            <Text align='center'>Site created by MERNage à trois </Text>
          </Box>
        </Box>
        :
        <Text>...loading</Text>
      }
    </ChakraProvider>
  )
}

export default EventShow
 