/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { getOneEvent } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, Container, Grid, GridItem, AspectRatio, ListIcon, List, ListItem, WrapItem, Icon, Button } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { ArrowRightIcon, CalendarIcon, ChatIcon, CheckCircleIcon, EmailIcon, StarIcon, TimeIcon } from '@chakra-ui/icons'


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
    <>
      {event ? 
        <ChakraProvider theme={theme}>
          <Container maxW='85vw' maxH='100vh' borderRadius='lg' borderColor='red.500'>
            <Box 
              mt={5}
              align='left'
            >
              <Heading ml={3} align='left' as='h1' fontSize='48px' color='pink.800'>SwingBy</Heading>
            </Box>
            <Center>
              <Grid
                bg='white'
                padding='10px'
                borderWidth='1px' 
                borderRadius='lg'
                borderColor='gray.500'
                w='100%'
                h='90vh'
                templateRows="repeat(12, 1fr)"
                templateColumns="repeat(12, 1fr)"
                gap={6}
              >
                <GridItem rowSpan={4} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='hidden'>
                  <Image 
                    src="https://www.wtso.com/blog/wp-content/uploads/2018/07/shutterstock_492006757.jpg" 
                    alt="dinner party photo" 
                    objectFit="contain"
                    align='left'
                  />
                </GridItem>
                <GridItem rowSpan={4} colSpan={4} borderRadius='lg' borderColor='red.500' >
                  <Heading color='pink.800' as='h2'>{event.name.toUpperCase()}</Heading>
                  <List spacing={3}>
                    <ListItem mt={2}>
                      <ListIcon as={CalendarIcon} color='pink.800' />
                      {event.startDateTime.split(' ').slice(0, 4).join(' ')}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={TimeIcon} color='pink.800' />
                      {event.startDateTime.split(' ').slice(4, 5)}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={ArrowRightIcon} color='pink.800' />
                      {event.duration} hours
                    </ListItem>
                    <ListItem>
                      <ListIcon as={ChatIcon} color='pink.800' />
                      {event.types}
                    </ListItem>
                  </List>
                </GridItem>
                <GridItem rowSpan={12} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='hidden'>
                  <Heading as='h3' align='center' color='pink.800'>
                  Comments
                  </Heading>
                  <List mt={5} spacing={10}>
                    {event.comments.map(comment => {
                      return (
                        <ListItem key={comment._id} borderColor='gray.200' borderWidth='1px' borderRadius='lg' p={2}>
                          <Flex>
                            <Avatar size='lg' name={comment.owner.firstName} src={comment.owner.profilePicture} />
                            <Flex flexDirection='column'  ml={3}>
                              <Flex>
                                <Heading as='h5' size='sm'>
                                  {comment.owner.avgRating.toPrecision(2)}
                                </Heading>
                                <StarIcon ml={3} color='pink.800'/>
                              </Flex>
                              <Text>
                                {comment.text}
                              </Text>
                            </Flex>
                          </Flex>
                        </ListItem>
                      )
                    })}
                  </List>
                </GridItem>
                <GridItem rowSpan={1} colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                  <Flex>
                    <Heading as='h3' color='red.800' mr={3}>Host:</Heading>
                    <Avatar name={event.owner.firstName, event.owner.lastName} size='md' src={event.owner.profilePicture}/>
                    <List ml={3} spacing={1}>
                      <ListItem>
                        <Flex>
                          <Heading as='h5' size='sm'>
                            {event.owner.avgRating.toPrecision(2)}
                          </Heading>
                          <StarIcon ml={3} color='pink.800'/>
                        </Flex>
                      </ListItem>
                      <ListItem>
                        <Text fontSize='lg'>
                          {`${event.owner.firstName} ${event.owner.lastName}`}
                        </Text>
                      </ListItem>
                    </List>
                    <Spacer />
                    <Button
                      alignSelf='center'
                      align='right'
                      variant='solid' 
                      bg='pink.800'
                      color='white'
                      boxShadow='sm'
                      _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                    >
                      <EmailIcon mr={3}/> Request invitation
                    </Button>
                    <Spacer />
                  </Flex>
                </GridItem>
                <GridItem rowSpan={4} colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                  <Heading as='h3' color='pink.800'>
                    Event description
                  </Heading>
                  <Text fontSize='lg' lineHeight='3ch'>
                    {event.description}
                  </Text>
                </GridItem>
              </Grid>
            </Center>
          </Container>
        </ChakraProvider> : 'loading'
      }

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
    </>
  )
}

export default EventShow
 