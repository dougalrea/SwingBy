/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { deleteEventComment, getOneEvent } from '../../lib/api'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, Container, Grid, GridItem, AspectRatio, ListIcon, List, ListItem, Wrap, WrapItem, Icon, Button, Tabs, TabPanels, TabPanel, TabList, Tab, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup
} from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { ArrowRightIcon, CalendarIcon, ChatIcon, CheckCircleIcon, EmailIcon, StarIcon, TimeIcon, EditIcon, CloseIcon } from '@chakra-ui/icons'
import ReactMapGL, { Marker } from 'react-map-gl'
import useForm from '../utils/useForm'
import { createEventComment, attendEvent, unattendEvent } from '../../lib/api'
import { getPayload } from '../../lib/auth'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'system-ui, sans-serif'
  }
})

function EventShow() {
  const [event, setEvent] = React.useState(null)
  const [hoveringAttending, setHoveringAttending] = React.useState(false)
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

  const { formdata, handleChange, setFormdata } = useForm({
    text: ''
  })

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createEventComment(id, formdata)
      setFormdata({
        text: ''
      })
      setEvent(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleAttend = async () => {
    try {
      const { data } = await attendEvent(id)
      setEvent(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnattend = async () => {
    try {
      const { data } = await unattendEvent(id)
      setEvent(data)
      setHoveringAttending(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCommentDelete = async (commentId) => {
    try {
      const { data } = await deleteEventComment(id, commentId)
      console.log(data)
      setEvent(data)
    } catch (err) {
      console.log(err)
    }
  }

  const isAttending = event ? event.attendees.some(attendee => {
    return attendee._id === getPayload().sub
  }) : null

  const handleEditClick = () => {
    history.push(`/events/${event._id}/edit`)
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        {event ? 
          <Container maxW='85vw' maxH='110vh' borderRadius='lg' borderColor='red.500'>
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
                      gap={4}
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
                            {event.startDateTime.split(' ').slice(4, 5).join('').slice(0, 5)}
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
                      <GridItem rowSpan={12} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='scroll'>
                        <GridItem align='right'>
                          {event.owner._id === getPayload().sub ? <Button
                            onClick={handleEditClick}
                            variant='solid' 
                            bg='pink.800'
                            color='white'
                            boxShadow='sm'
                            _hover={{ boxShadow: 'md', bg: 'pink.700' }}>
                      Edit Event
                          </Button> : ''}
                        </GridItem>
                        <Heading as='h3' align='center' color='pink.800'>
                  Comments
                        </Heading>
                        <List mt={5} spacing={5} overflowY='scroll'>
                          {event.comments.map(comment => {
                            return (
                              <ListItem key={comment._id} borderColor='gray.200' borderWidth='1px' borderRadius='lg' p={2}>
                                <Link to={comment.owner._id !== getPayload().sub && `/people/${comment.owner._id}`}>
                                  <Flex>
                                    <Avatar size='lg' name={comment.owner.firstName} src={comment.owner.profilePicture} />
                                    <Flex flexDirection='column' w='100%'  ml={3}>
                                      <Flex flexDirection='row' w='100%'>
                                        <Heading as='h5' size='sm' color='pink.800'>
                                          {`${comment.owner.firstName} ${comment.owner.lastName}`}
                                        </Heading>
                                        <Spacer />
                                        {Number(comment.owner.avgRating) ? 
                                          <Heading as='h5' size='sm' color='pink.800'>
                                            {(comment.owner.avgRating.toPrecision(2))}
                                            <StarIcon ml={1} mb={1} color='pink.800'/>
                                          </Heading>
                                          : 
                                          <Text color='pink.800'>
                                          (Not yet rated)
                                          </Text>}
                                        <Spacer />
                                        {comment.owner._id === getPayload().sub &&
                                            <Button
                                              maxH={4}
                                              size='sm'
                                              onClick={() => handleCommentDelete(comment._id)}
                                              alignSelf='center'
                                              align='right'
                                              variant='solid' 
                                              bg='pink.800'
                                              color='white'
                                              boxShadow='sm'
                                              _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                                              _active={{ bg: 'pink.700' }}
                                            >Delete
                                            </Button>}
                                      </Flex>
                                      <Text >
                                        {comment.text}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                </Link>
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
                                  {typeof(event.owner.avgRating) === 'number' ? event.owner.avgRating.toPrecision(2) : '(Not yet rated)'}
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
                        </Flex>
                      </GridItem>

                      <GridItem rowSpan={1} h='45px' colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                        <Flex>
                          <Heading as='h3' color='red.800' mr={3}>Attendees:</Heading>
                          <Stack align='center' ml={5} direction='row'>
                            <Wrap h='43px' overflow='scroll'>
                              {event.attendees.map(attendee => (
                                <WrapItem key={attendee._id}>
                                  <Link to={`/people/${attendee._id}`}>
                                    <Avatar size='sm' mr={2} mt={2} src={attendee.profilePicture}/>
                                  </Link>
                                </WrapItem>
                              ))}
                            </Wrap>
                          </Stack>
                          <Spacer />
                          {isAttending ?
                            <Popover>
                              {({ isOpen, onClose }) => (
                                <>
                                  <PopoverTrigger>
                                    <Button
                                      onMouseEnter={() => setHoveringAttending(true)}
                                      onMouseLeave={() => setHoveringAttending(false)}
                                      alignSelf='center'
                                      align='right'
                                      variant='solid' 
                                      bg='pink.800'
                                      color='white'
                                      boxShadow='sm'
                                      _hover={isOpen ? { boxShadow: 'sm', bg: 'pink.800' } :
                                        { boxShadow: 'md', bg: 'pink.700' }}
                                      _active={{ bg: 'pink.700' }}
                                    >
                                      {hoveringAttending || isOpen ?
                                        <span><CloseIcon mr={3}/>Unattend</span>
                                        :
                                        <span><CheckCircleIcon mr={3}/>Attending</span>
                                      }
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody textAlign='center'>
                                      Are you sure you want to unattend?
                                    </PopoverBody>
                                    <PopoverFooter
                                      border='0'
                                      d='flex'
                                      justifyContent='center'
                                      pt={0}
                                    >
                                      <ButtonGroup size='sm'>
                                        <Button
                                          onClick={onClose}
                                          bg='pink.800'
                                          color='white'
                                          boxShadow='sm'
                                          _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                                          _active={{ bg: 'pink.700' }}
                                        >
                                          No
                                        </Button>
                                        <Button
                                          onClick={handleUnattend}
                                          bg='pink.800'
                                          color='white'
                                          boxShadow='sm'
                                          _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                                          _active={{ bg: 'pink.700' }}
                                        >
                                          Yes
                                        </Button>
                                      </ButtonGroup>
                                    </PopoverFooter>
                                  </PopoverContent>
                                </>
                              )}
                            </Popover>
                            :
                            <Button
                              onClick={handleAttend}
                              align='right'
                              variant='solid' 
                              bg='pink.800'
                              color='white'
                              boxShadow='sm'
                              _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                              _active={{ bg: 'pink.700' }}
                            >
                              <EmailIcon mr={3}/> Attend
                            </Button>
                          }
                        </Flex>
                      </GridItem>

                      <GridItem rowSpan={3} colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                        <Heading as='h3' color='pink.800'>
                    Event description
                        </Heading>
                        <Text fontSize='lg' lineHeight='26px'>
                          {event.description}
                        </Text>
                      </GridItem>
                      <GridItem mt={3} rowSpan={3} colSpan={8} borderColor='gray.200' borderRadius='lg'>
                        <form action='submit' onSubmit={handleComment} >
                          <Flex>
                            <Heading as='h3' color='pink.800'>
                        Leave a comment
                            </Heading>
                            <Spacer />
                            <Button
                              type='submit'
                              alignSelf='center'
                              align='right'
                              variant='solid' 
                              bg='pink.800'
                              color='white'
                              boxShadow='sm'
                              _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                            >
                              <EditIcon mr={3}/>Post
                            </Button>                         
                          </Flex>                                        
                          <FormControl isRequired>
                            <InputGroup>
                              <InputLeftElement  children={<ChatIcon />}/>
                              <Textarea
                                type='text'
                                pl={8}
                                size='lg'
                                name='text'
                                // onFocus={handleFocus}
                                onChange={handleChange}
                                value={formdata.text}
                                placeholder={'Think of something witty! Remember, you\'re being rated...'}
                                aria-label='description'
                              />
                            </InputGroup>
                          </FormControl>
                        </form>
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
 