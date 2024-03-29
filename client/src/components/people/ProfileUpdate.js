/* eslint-disable react/no-children-prop */

import React from 'react'
import { editUser, getOnePerson } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Stack, FormControl,
  FormLabel, Input, ChakraProvider, Center, Container, Grid, GridItem, Button, InputGroup, InputLeftElement, Textarea, Select, RadioGroup, Radio } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { ChatIcon, AddIcon, ViewIcon } from '@chakra-ui/icons'
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
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    alias: '',
    profilePicture: '',
    age: '',
    gender: '',
    sexualOrientation: '',
    height: '',
    politics: '',
    isOpenToDrugs: '',
    isSmoker: '',
    interests: [],
    foodPreferences: ''
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
              templateRows="repeat(8, 1fr)"
              templateColumns="repeat(8, 1fr)"
              gap={2}
            >
              <GridItem rowStart={1} rowEnd={4} colStart={1} colEnd={4} overflow='hidden'>
                {formdata.profilePicture ? <Image 
                  src={formdata.profilePicture} 
                  alt="invalid url" 
                  objectFit="contain"
                  align='center'
                  boxShadow='md'
                /> : <Image 
                  src="https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon.png" 
                  alt="user-icon" 
                  align='left'
                /> }
                
              </GridItem>
              <GridItem rowStart={1} rowEnd={4} colStart={4} colEnd={7}>
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
                        name='lastName'
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formdata.lastName}
                        placeholder='Surname' 
                        aria-label='lastName' 
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
                        placeholder='Profile Picture (enter a url!)' 
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
                    <FormLabel>🚬 Fancy a cig?</FormLabel>
                    <RadioGroup
                      spacing={2} 
                      mt={2} 
                      name='rating' 
                      value={formdata.isSmoker}>
                      <Stack direction="column" color='gray.800'>
                        <Radio
                          isChecked={formdata.isSmoker} 
                          name='isSmoker' 
                          value='true' 
                          onChange={handleChange}
                        >Yeah why not
                        </Radio>
                        <Radio 
                          isChecked={!formdata.isSmoker} 
                          name='isSmoker'
                          value='false' 
                          onChange={handleChange}
                        >Ew gross no thanks
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>🍔 Food Preferences</FormLabel>
                    <Select placeholder='What do you eat?' name='foodPreferences' onFocus={handleFocus} onChange={handleChange} value={formdata.foodPreferences}>
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
              
              <GridItem rowStart={5} rowEnd={9} colStart={1} colEnd={4} >
                <FormControl isRequired>
                  <Heading size='lg' ml={4} h='40px' color='pink.800' as='h3'>Update Bio</Heading>
                  <InputGroup>
                    <InputLeftElement  />
                    <Textarea 
                      width='300px'
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
              <GridItem rowStart={8} rowEnd={8} colStart={8} colEnd={9}>
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
          {error ? <Text>Something went wrong there... sorry about that</Text> : ''}
        </Center>
      </Container>
    </ChakraProvider>

  )
}
export default ProfileUpdate
 
