/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { getOneEvent } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, Container, Grid, GridItem, AspectRatio, ListIcon, List, ListItem, WrapItem, Icon, Button, Tabs, TabPanels, TabPanel, TabList, Tab } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { ArrowRightIcon, CalendarIcon, ChatIcon, CheckCircleIcon, EmailIcon, StarIcon, TimeIcon } from '@chakra-ui/icons'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'system-ui, sans-serif'
  }
})

function EventShow() {
  const [event, setEvent] = React.useState(null)
  const [viewport, setViewport] = React.useState(null)
  const history = useHistory()
  const { id } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getOneEvent(id)
        setEvent(data)
        setViewport({ 
          latitude: data.latitude,
          longitude: data.longitude,
          zoom: 12
        })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  event ?
    console.log(`latitude: ${event.latitude}, longitude: ${event.longitude}`) : ''

  const handleEditClick = () => {
    history.push(`/events/${event._id}/edit`)
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        {event ? 
          <Container maxW='85vw' maxH='110vh' borderRadius='lg' borderWidth='1px' borderColor='red.500'>
            <Box 
              mt={5}
              align='left'
            >
              <Heading ml={3} align='left' as='h1' fontSize='48px' color='pink.800'>SwingBy</Heading>
            </Box>
            <Center>
              <Tabs variant='enclosed' align='center'>
                <TabList>
                  <Tab>Details</Tab>
                  <Tab>Location</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Grid
                      align='left'
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
                          src={event.imageURL} 
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
                        <GridItem align='right'>
                          <Button
                            onClick={handleEditClick}
                            variant='solid' 
                            bg='pink.800'
                            color='white'
                            boxShadow='sm'
                            _hover={{ boxShadow: 'md', bg: 'pink.700' }}>
                      Edit Profile
                          </Button>
                        </GridItem>
                        <Heading as='h3' align='center' color='pink.800'>
                  Comments
                        </Heading>
                        <List mt={5} spacing={5}>
                          {event.comments.map(comment => {
                            return (
                              <ListItem key={comment._id} borderColor='gray.200' borderWidth='1px' borderRadius='lg' p={2}>
                                <Flex>
                                  <Avatar size='lg' name={comment.owner.firstName} src={comment.owner.profilePicture} />
                                  <Flex flexDirection='column'  ml={3}>
                                    <Flex>
                                      <Heading as='h5' size='sm'>
                                        {`${comment.owner.firstName} ${comment.owner.lastName} ${Number(comment.owner.avgRating) ?
                                          (comment.owner.avgRating.toPrecision(2)) : ' Not Rated'}`}
                                      </Heading>
                                      {!!Number(comment.owner.avgRating) &&
                                        <StarIcon ml={3} color='pink.800'/>
                                      }
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
                                  {(event.owner.avgRating) ?
                                    (event.owner.avgRating.toPrecision(2)) : ' Not Rated' }
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
                      <GridItem rowSpan={3} colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                        <Heading as='h3' color='pink.800'>
                    Event description
                        </Heading>
                        <Text fontSize='lg' lineHeight='3ch'>
                          {event.description}
                        </Text>
                      </GridItem>
                      <GridItem rowSpan={3} colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                        <Heading as='h3' color='pink.800'>
                    Leave a comment
                        </Heading>

                      </GridItem>
                    </Grid>
                  </TabPanel>
                  <TabPanel                         
                    maxW='100%'
                    w='85vw' 
                    h='90vh'
                    borderWidth='1px' 
                    borderRadius='lg'
                    borderColor='gray.500'
                  >
                    {viewport ?
                      <ReactMapGL
                        position='inherit'
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                        height="100%"
                        width="100%"
                        mapStyle='mapbox://styles/mapbox/outdoors-v11'
                        latitude={parseFloat(viewport.latitude)}
                        longitude={parseFloat(viewport.longitude)}
                        zoom={viewport.zoom}
                        onViewportChange={viewport => setViewport(viewport)}
                      >
                        <Marker
                          latitude={parseFloat(event.latitude)}
                          longitude={parseFloat(event.longitude)}
                        >
                        🎯
                        </Marker>
                      </ReactMapGL>
                      :
                      'Loading'
                    }
                  </TabPanel>
                </TabPanels>
              </Tabs>
              
            </Center>
          </Container>
          : 'loading'
        }
      </ChakraProvider>
    </>
  )
}

export default EventShow
 