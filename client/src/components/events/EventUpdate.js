/* eslint-disable react/no-children-prop */

import React from 'react'
import { editEvent, getOneEvent } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Image, Stack, FormControl, Input, ChakraProvider, Center, Container, Grid, GridItem, Button, InputGroup, InputLeftElement, InputRightAddon, Textarea } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { CalendarIcon, ChatIcon, ArrowUpIcon, TimeIcon, AddIcon, ViewIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'
import useForm from '../utils/useForm'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'system-ui, sans-serif'
  }
})

function EventUpdate() {
  const history = useHistory()
  const { id } = useParams()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange, setFormdata } = useForm({
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

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getOneEvent(id)
      setFormdata(data)
    }
    getData()
  }, [id, setFormdata])

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await editEvent(id, formdata)
      history.push(`/events/${id}`)
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  const [viewport, setViewport] = React.useState({
    latitude: 51.504227,
    longitude: -0.126563,
    zoom: 8
  })

  const findLocation = () => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude } } = position
      formdata.latitude = latitude
      formdata.longitude = longitude
      setViewport({ latitude, longitude, 'zoom': 15 })
    }
    )
  }

  console.log(error)

  const now = new Date().toISOString().split(':').slice(0, 2).join(':')
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container maxW='85vw' maxH='110vh' >
        <Box
          mt={15}
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
              h='80vh'
              templateRows="repeat(7, 1fr)"
              templateColumns="repeat(12, 1fr)"
              gap={1}
            >
              <GridItem m={1} rowSpan={5} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='hidden'>
                {formdata.imageURL ? <Image
                  boxShadow='md'
                  src={formdata.imageURL}
                  alt="invalid url"
                  objectFit="contain"
                  p={5}
                  align='left'
                /> : <Image
                  src="https://images.squarespace-cdn.com/content/v1/5715100cf8baf3c79d443859/1474644021472-6M4JHVDCPUSK4SOGDO6Y/ke17ZwdGBToddI8pDm48kFr-MCz83LG2ZqzGFu9uALUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcFld4UtfH4YE_GYCkgGJoltUf3XSTmDyr_decxWmWcyKxz1JLteulDk500xDZnDHA/placeholder3.png?format=2500w"
                  alt="dinner party photo"
                  objectFit="contain"
                  boxShadow='md'
                  align='left'
                /> }
              </GridItem>
              <GridItem m={1} rowSpan={5} colSpan={4} >
                <Stack>
                  <Heading size='lg' color='pink.800' as='h3'>Update your event details</Heading>
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
                      <InputLeftElement children={<AddIcon />} />
                      <Input
                        type='text'
                        name='types'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.types}
                        placeholder='Event Type'
                        aria-label='event type'
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
                      <InputRightAddon children='capacity' />
                    </InputGroup>
                  </FormControl>
                </Stack>
              </GridItem>
              <GridItem m={1} rowSpan={5} colSpan={4} borderRadius='lg' borderColor='gray.500' borderWidth='1px'>
                {viewport ?
                  <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    height="100%"
                    width="100%"
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    latitude={formdata.latitude ? Number(formdata.latitude) : 51}
                    longitude={formdata.longitude ? Number(formdata.longitude) : -0.6}
                    zoom={5}
                  >
                    <Marker latitude={viewport.latitude} longitude={viewport.longitude}>🎯
                    </Marker>
                  </ReactMapGL>
                  :
                  <h1>Finding your location...</h1>
                }
              </GridItem>
              <GridItem rowSpan={4} colSpan={8} >
                <FormControl isRequired>
                  <Heading size='lg' mt={6} ml={4} h='40px' color='pink.800' as='h3'>Event description</Heading>
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
              <GridItem mt={7} rowSpan={2} colSpan={4} >
                <Button onClick={findLocation}>
                Use My Location
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
              <GridItem align='right'>
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
export default EventUpdate