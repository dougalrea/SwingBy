/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { createEvent, getOneEvent } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, Container, Grid, GridItem, AspectRatio, ListIcon, List, ListItem, WrapItem, Icon, Button, InputGroup, InputLeftElement, TabList, Tab, InputRightAddon, Textarea } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { CalendarIcon, ChatIcon, CheckCircleIcon, ArrowUpIcon, EmailIcon, StarIcon, TimeIcon, AddIcon, ViewIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'
import useForm from '../utils/useForm'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'Raleway'
  }
})

function EventCreate() {
  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    name: '',
    imageURL: '',
    latitude: '',
    longitude: '',
    startDateTime: '',
    capacity: '',
    duration: '',
    description: '',
    types: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await createEvent(formdata)
      history.push('/events')
    } catch (err) {
      setError(true)
    }
  }
  const handleFocus = () => {
    setError(false)
  }

  const [viewport, setViewport] = React.useState({
    latitude: 51.2,
    longitude: -0.6,
    zoom: 8
  })

  let i = 1

  const findMyLocation = () => {
    i++
  }

  React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude } } = position
      setViewport({ latitude, longitude, 'zoom': 15 })
      console.log(i)
    })
  }, [formdata.latitude, formdata.longitude])

  console.log(viewport)



  const now = new Date().toISOString().split(':').slice(0, 2).join(':')

  return (
    <ChakraProvider theme={theme}>
      <Container maxW='85vw' maxH='110vh' >
        <Box 
          mt={5}
          align='left'
        >
          <Heading ml={3} align='left' as='h1' fontSize='48px' color='pink.800'>SwingBy</Heading>
        </Box>
        <Center>
          <form action='submit' onSubmit={handleSubmit}>

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
              <GridItem rowSpan={5} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='hidden'>
                {formdata.imageURL ? <Image 
                  src={formdata.imageURL} 
                  alt="invalid url" 
                  objectFit="contain"
                  align='left'
                /> : <Image 
                  src="https://images.squarespace-cdn.com/content/v1/5715100cf8baf3c79d443859/1474644021472-6M4JHVDCPUSK4SOGDO6Y/ke17ZwdGBToddI8pDm48kFr-MCz83LG2ZqzGFu9uALUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcFld4UtfH4YE_GYCkgGJoltUf3XSTmDyr_decxWmWcyKxz1JLteulDk500xDZnDHA/placeholder3.png?format=2500w" 
                  alt="dinner party photo" 
                  objectFit="contain"
                  align='left'
                /> }
                
              </GridItem>
              <GridItem rowSpan={5} colSpan={4} >
                <Stack>
                  <Heading size='lg' color='pink.800' as='h3'>Provide details for your event</Heading>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement children={<AddIcon />} />
                      <Input 
                        type='text'
                        name='name'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.name}
                        placeholder='Event Name' 
                        aria-label='event name' 
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl >
                    <InputGroup>
                      <InputLeftElement children={<ViewIcon />} />
                      <Input 
                        type='text'
                        name='imageURL'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.imageURL}
                        placeholder='Image url (preview shown to the left)' 
                        aria-label='image url' 
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement children={<CalendarIcon />} />
                      <Input 
                        type='datetime-local'
                        name='startDateTime'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.startDateTime}
                        min={now} 
                        aria-label='date-time selector' 
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement children={<TimeIcon />} />
                      <Input 
                        type='number'
                        name='duration'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.duration}
                        placeholder='Duration'
                        aria-label='duration' 
                      />
                      <InputRightAddon children='hours' />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement children={<SettingsIcon />} />
                      <Input 
                        type='number'
                        name='capacity'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.capacity}
                        placeholder='Capacity'
                        aria-label='capacity' 
                      />
                      <InputRightAddon children='attendees' />
                    </InputGroup>
                  </FormControl>
                </Stack>    
              </GridItem>
              <GridItem rowSpan={5} colSpan={4} borderRadius='lg' borderColor='gray.500' borderWidth='1px'>
                {viewport ?
                  <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    height="100%"
                    width="100%"
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    latitude={viewport.latitude}
                    longitude={viewport.longitude}
                    zoom={5}
                  >
                    <Marker latitude={viewport.latitude} longitude={viewport.longitude}>🎯
                    </Marker>
                  </ReactMapGL>
                  :
                  <h1>Finding your location...</h1>
                }
              </GridItem>
              <GridItem rowSpan={2} colSpan={8} >
                <FormControl isRequired>
                  <Heading size='lg' ml={4} h='40px' color='pink.800' as='h3'>Event description</Heading>
                  <InputGroup>
                    <InputLeftElement  />
                    <Textarea 
                      type='text'
                      children={<ChatIcon />}
                      size='lg'
                      name='description'
                      onFocus={handleFocus}
                      onChange={handleChange}
                      value={formdata.description}
                      placeholder='Make it sound appealing!'
                      aria-label='description' 
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={2} colSpan={4} >
                <Button onClick={findMyLocation}>
                Find My Location
                </Button>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<ArrowForwardIcon />} />
                    <Input 
                      type='number'
                      name='latitude'
                      onFocus={handleFocus}
                      onChange={handleChange}
                      value={formdata.latitude}
                      placeholder='Latitude'
                      aria-label='latitude' 
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<ArrowUpIcon />} />
                    <Input 
                      type='number'
                      name='longitude'
                      onFocus={handleFocus}
                      onChange={handleChange}
                      value={formdata.longitude}
                      placeholder='Longitude'
                      aria-label='longitude' 
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={3} colSpan={8}>
              </GridItem>
              <GridItem>
                <Button
                  type='submit' 
                  variant='solid' 
                  bg='pink.800'
                  color='white'
                  boxShadow='sm'
                  _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                >
            Submit
                </Button>
              </GridItem>
            </Grid>
          </form>

        </Center>
      </Container>
    </ChakraProvider>

  )
}
export default EventCreate
 
// const eventsSchema = new mongoose.Schema({
//   name: { type: String, required: true, maxlength: 25 },
//   imageURL: { type: String, required: false },
//   latitude: { type: String, required: true },
//   longitude: { type: String, required: true },
//   startDateTime: { type: String, required: true },
//   duration: { type: Number, required: false },
//   types: [{ type: String }],
//   description: { type: String, required: false, maxlength: 500 },
//   capacity: { type: Number, required: true },
//   owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
//   attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
//   attendeeRequests: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
//   comments: [commentSchema]
// })