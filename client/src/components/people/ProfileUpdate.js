/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { editUser, getOnePerson } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, Container, Grid, GridItem, AspectRatio, ListIcon, List, ListItem, WrapItem, Icon, Button, InputGroup, InputLeftElement, TabList, Tab, InputRightAddon, Textarea, Select } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { CalendarIcon, ChatIcon, CheckCircleIcon, ArrowUpIcon, EmailIcon, StarIcon, TimeIcon, AddIcon, ViewIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'
import useForm from '../utils/useForm'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'system-ui, sans-serif'
  }
})

function ProfileUpdate() {
  const history = useHistory()
  const { id } = useParams()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange, setFormdata } = useForm({
    bio: '',
    alias: '',
    profilePicture: '',
    gender: '',
    sexualOrientation: '',
    height: '',
    politics: '',
    foodPreferences: []
  })

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getOnePerson(id)
      setFormdata(data)
    }
    getData()
  }, [id, setFormdata])
  

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await editUser(id, formdata)
      console.log(data)
      history.push(`/people/${id}`)
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  console.log(formdata)
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container maxW='70vw'>
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
              bg='whit'
              padding='5px'
              borderWidth='1px' 
              borderRadius='md'
              borderColor='gray.500'
              w='100%'
              h='80vh'
              templateRows="repeat(4, 1fr)"
              templateColumns="repeat(8, 1fr)"
              gap={1}
            >
              <GridItem rowSpan={5} colSpan={4}>
                {formdata.profilePicture ? <Image 
                  h='300px'
                  src={formdata.profilePicture} 
                  alt="invalid url" 
                  objectFit="contain"
                  align='center'
                  boxShadow='md'
                  mb={5}
                  p={5}
                /> : <Image 
                  src="https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon.png" 
                  alt="user-icon" 
                  objectFit="contain"
                  align='left'
                /> }
                
              </GridItem>
              <GridItem rowSpan={5} colSpan={4} >
                <Stack>
                  <Heading size='lg' color='pink.800' as='h3'>Update Profile</Heading>

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement children={<AddIcon />} />
                      <Input 
                        type='text'
                        name='firstName'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.firstName}
                        placeholder='Name' 
                        aria-label='name' 
                      />
                    </InputGroup>
                  </FormControl>
                
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement children={<AddIcon />} />
                      <Input 
                        type='text'
                        name='lastname'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.lastName}
                        placeholder='Lastname' 
                        aria-label='lastname' 
                      />
                    </InputGroup>
                  </FormControl>
                  
                  

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement children={<ViewIcon />} />
                      <Input 
                        type='text'
                        name='profilePicture'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.profilePicture}
                        placeholder='Profile Picture (preview shown to the left)' 
                        aria-label='Profile Picture' 
                      />
                    </InputGroup>
                  </FormControl>

                  
                  <Box>
                    <FormControl>
                      <FormLabel>👦 Gender</FormLabel>
                      <Select placeholder='Select Gender' name='gender' onFocus={handleFocus} onChange={handleChange} value={formdata.gender}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Trans man</option>
                        <option>Trans woman</option>
                        <option>Intersex</option>
                        <option>Prefer not to say</option>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  
                  <Box>
                    <FormControl>
                      <FormLabel>🍆 Sexual Orientation</FormLabel>
                      <Select placeholder='Select Sexual Orientation' name='sexualOrientation' onFocus={handleFocus} onChange={handleChange} value={formdata.sexualOrientation}>
                        <option>Men</option>
                        <option>Women</option> 
                        <option>Everyone</option> 
                      </Select>
                    </FormControl>
                  </Box>
                  

                  <FormControl>
                    <FormLabel>🧠 Politics</FormLabel>
                    <Select placeholder='Select Political Beliefs' name='politics' onFocus={handleFocus} onChange={handleChange} value={formdata.politics}>
                      <option>Liberal</option>
                      <option>Conservative</option>
                      <option>Fascist</option>
                      <option>Socialist</option>
                      <option>Anarchist</option>
                      <option>Communist</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>🚬  Does Smoke</FormLabel>
                    <Select placeholder='Smoke?' name='isSmoker' onFocus={handleFocus} onChange={handleChange} value={formdata.isSmoker}>
                      <option>Yes</option>
                      <option>No</option> 
  
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>🍔 Food Preferences</FormLabel>
                    <Select placeholder='Select Favourite Foods' name='foodPreferences' onFocus={handleFocus} onChange={handleChange} value={formdata.foodPreferences}>
                      <option>Vegetarian</option>
                      <option>Gluten free</option>
                      <option>Dairy free</option>
                      <option>Omnivore</option>
                      <option>Nut allergy</option>
                      <option>Pescatarian</option>
                      <option>Vegan</option>
                      <option>Macrobiotic</option>
                    </Select>
                  </FormControl>
                </Stack>    
              </GridItem>
              
              <GridItem rowSpan={4} colSpan={8} >
                <FormControl isRequired>
                  <Heading size='lg' ml={4} h='40px' color='pink.800' as='h3'>Update Bio</Heading>
                  <InputGroup>
                    <InputLeftElement  />
                    <Textarea 
                      width='400px'
                      height='250px'
                      type='text'
                      children={<ChatIcon />}
                      size='lg'
                      name='bio'
                      onFocus={handleFocus}
                      onChange={handleChange}
                      value={formdata.bio}
                      placeholder='Tell us a little about yourself...'
                      aria-label='bio' 
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colStart={8} colEnd={8} rowSpan={3}>
                <Button
                  onClick={handleSubmit}
                  type='submit' 
                  variant='solid' 
                  size='lg'
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
export default ProfileUpdate
 
