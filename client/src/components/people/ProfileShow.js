/* eslint-disable prefer-const */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React from 'react'
import { getOnePerson } from '../../lib/api'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Box, Heading, Text, Image, Flex, Spacer, Stack, Badge, FormControl,
  FormLabel, FormHelperText, Input, ChakraProvider, Divider, Center, Avatar, Container, Grid, GridItem, AspectRatio, ListIcon, List, ListItem, WrapItem, Wrap, Button, Tabs, TabPanels, TabPanel, TabList, Tab, InputGroup, InputLeftElement, Textarea, Radio, RadioGroup } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import { ArrowRightIcon, CalendarIcon, ChatIcon, CheckCircleIcon, EmailIcon, PlusSquareIcon, StarIcon, TimeIcon, EditIcon } from '@chakra-ui/icons'

import { followPerson, unfollowPerson, createPersonReview, editPersonReview } from '../../lib/api'
import { getPayload, isOwner } from '../../lib/auth'
import useForm from '../utils/useForm'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'system-ui, sans-serif'
  }
})

function ProfileShow() {
  const [error, setError] = React.useState(false)
  const [person, setPerson] = React.useState(null)
  const [hasReviewed, setHasReviewed] = React.useState(false)

  const { id } = useParams()
  const history = useHistory()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getOnePerson(id)
        setPerson(data)
        const profilePastEvents = data.eventsAttendeeOf.filter(event => {
          return event.hasExpired
        })
        const allowedReviewers = []
        profilePastEvents.forEach(event => {
          event.attendees.forEach(attendee => {
            allowedReviewers.push(attendee)
          })
        })
        if (!allowedReviewers.includes(getPayload().sub)) {
          setError(true)
        }
        if (data.reviews.some(review => {
          return review.owner._id === getPayload().sub
        })) {
          setHasReviewed(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  const handleEditClick = () => {
    history.push(`/people/${person._id}/edit`)
  }

  const handleFollow = async () => {
    try {
      const { data } = await followPerson(id)
      setPerson(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnFollow = async () => {
    try {
      const { data } = await unfollowPerson(id)
      setPerson(data)
    } catch (err) {
      console.log(err)
    }
  }

  const isFollowing = person ? person.followedBy.some(follower => {
    return follower._id === getPayload().sub
  }) : null

  let { formdata, handleChange, setFormdata } = useForm({
    text: '',
    rating: ''
  })
  
  const handleReview = async (e) => {
    e.preventDefault()
    if (hasReviewed) {
      try {
        const reviewToEdit = person.reviews.find(review => {
          return review.owner._id === getPayload().sub
        })
        const reviewId = reviewToEdit._id
        const { data } = await editPersonReview(id, reviewId, formdata)
        setPerson(data)
        setFormdata({
          text: '',
          rating: ''
        })
        return
      } catch (err) {
        console.log(err)
        return
      }
    }
    try {
      const { data } = await createPersonReview(id, formdata)
      setPerson(data)
      setHasReviewed(true)
      setFormdata({
        text: '',
        rating: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        <Fonts />
        {person ? 
          <Container maxW='85vw' maxH='110vh'>
            <Flex>
              <Box 
                mt={5}
                align='left'
              >
                <Heading ml={3} align='left' as='h1' fontSize='48px' color='pink.800'>SwingBy</Heading>
              </Box>
              <Spacer />
              {id === getPayload().sub &&
                <Button
                  onClick={handleEditClick}
                  mt={8}
                  alignSelf='center'
                  variant='solid' 
                  bg='pink.800'
                  color='white'
                  boxShadow='sm'
                  _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                >
                  Edit Profile
                </Button>}
            </Flex>           
            <Center>
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
                <GridItem rowSpan={4} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='hidden' >
                  <Image 
                    src={person.profilePicture} 
                    alt="profile picture" 
                    objectFit="contain"
                    align='left'
                    borderRadius='3xl'
                  />
                </GridItem>
                <GridItem rowSpan={5} colSpan={4} borderRadius='lg' borderColor='red.500'>
                  <Flex>
                    <Heading as='h2' color='pink.800'>
                      {`${person.firstName} ${person.lastName}`}
                    </Heading>
                    <Heading color='pink.800' size='lg' ml={4}> {`${Number(person.avgRating) ?
                      (person.avgRating.toPrecision(2)) : ' Not Rated'}`}
                    
                    {!!Number(person.avgRating) &&
                    <StarIcon mb={3} ml={1} color='pink.800'/>
                    }
                    </Heading>
                  </Flex>
                  <List spacing={0}>
                    <ListItem mt={2}>
                      <Text>Age: {person.age}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Gender: {person.gender}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Height: {person.height}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Interested in: {person.sexualOrientation}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Politics: {person.politics}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Smoker? {person.isSmoker ? 'Yes' : 'No'}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Food Preferences: {person.foodPreferences}</Text>
                    </ListItem>
                    <ListItem>
                      <Flex direction='column'>
                        <Text>Interests: </Text>
                        <Wrap maxH={12}>
                          <WrapItem>
                            <Badge colorScheme='blue'>{person.interests[0]}</Badge>
                          </WrapItem>
                          <WrapItem>
                            <Badge colorScheme="green">{person.interests[1]}</Badge>
                          </WrapItem>
                          <WrapItem>
                            {person.interests[2] ? <Badge colorScheme="red">{person.interests[2]}</Badge> : ''}
                          </WrapItem>
                          <WrapItem>
                            {person.interests[3] ? <Badge colorScheme="purple">{person.interests[3]}</Badge> : ''}
                          </WrapItem>
                          <WrapItem>
                            {person.interests[4] ? <Badge colorScheme="blue">{person.interests[4]}</Badge> : ''}
                          </WrapItem>
                          <WrapItem>
                            {person.interests[5] ? <Badge colorScheme="green">{person.interests[5]}</Badge> : ''}
                          </WrapItem>
                        </Wrap>
                      </Flex>
                    </ListItem>
                  </List>
                </GridItem>
                <GridItem rowSpan={12} colSpan={4} borderRadius='lg' borderColor='red.500' overflow='hidden'>
                  <GridItem align='right'>
                    
                  </GridItem>
                  <Heading as='h3' align='center' color='pink.800'>
                  Reviews:
                  </Heading>
                  <List mt={5} spacing={5}>
                    {person.reviews.map(review => {
                      return (
                        
                        <ListItem key={review._id} borderColor='gray.200' borderWidth='1px' borderRadius='lg' p={2}>
                          <Link to={`/people/${review.owner._id}`} >
                            <Flex>
                              <Avatar size='lg' name={review.owner.firstName} src={review.owner.profilePicture} />
                              <Flex flexDirection='column'  ml={3}>
                                <Flex>
                                  <Heading as='h5' size='sm' ml={2}>
                                    {`${review.owner.firstName} ${review.owner.lastName}`} 
                                  </Heading>
                                  <Spacer />
                                  <Heading as='h5' size='sm'>{`
                                  ${Number(review.rating)}`}
                                  <StarIcon ml={1} mb={1} color='pink.800'/>
                                  </Heading>
                                </Flex>
                                <Box w='18vw'>
                                  <Text w='100%'>
                                    {review.text}
                                  </Text>
                                </Box>
                              </Flex>
                            </Flex>
                          </Link>
                        </ListItem>
                      )
                    })}
                  </List>
                </GridItem>
                {isOwner(id) ?
                  <GridItem rowSpan={3} colSpan={4} p={3} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                    <Flex >
                      <Heading as='h3' color='pink.800'>Following</Heading>
                      <Stack align='center' ml={5} direction='row'>
                        <Wrap h='170px' overflow='scroll'>
                          {person.following.map(follow => {
                            return (
                              <WrapItem key={follow._id}>
                                <Link to={`/people/${follow._id}`}>
                                  <Avatar size='sm' src={follow.profilePicture} />
                                </Link>
                              </WrapItem>
                            )
                          })}
                        </Wrap>
                      </Stack>
                    </Flex>
                  </GridItem>
                  :
                  <GridItem rowSpan={3} colSpan={4} p={3} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                    <Flex>
                      <Flex direction='column'>
                        <Heading as='h3' color='pink.800' mb={3}>Followers</Heading>
                        {isFollowing ? 
                          <Button
                            onClick={handleUnFollow}
                            alignSelf='center'
                            align='right'
                            variant='solid' 
                            bg='pink.800'
                            color='white'
                            boxShadow='sm'
                            _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                          >
                            <CheckCircleIcon mr={3}/> Unfollow
                          </Button> 
                          :
                          <Button
                            onClick={handleFollow}
                            alignSelf='center'
                            align='right'
                            variant='solid' 
                            bg='pink.800'
                            color='white'
                            boxShadow='sm'
                            _hover={{ boxShadow: 'md', bg: 'pink.700' }}
                          >
                            <PlusSquareIcon mr={3}/> Follow
                          </Button> 
                        }
                      </Flex>
                      <Stack align='center' ml={5} direction='row'>
                        <Wrap>
                          {person.followedBy.slice(0, 12).map(follower => {
                            return (
                              <WrapItem key={follower._id} >
                                <Avatar size='sm' src={follower.profilePicture} />
                              </WrapItem>
                            )
                          })}
                          {person.followedBy.length > 12 && <Text ml={1}>
                                And {`${person.followedBy.length - 12} others`}
                          </Text>}
                        </Wrap>
                      </Stack>
                    </Flex>
                  </GridItem>
                }
                <GridItem p={3} rowSpan={3} colSpan={8} borderColor='gray.200' borderWidth='1px' borderRadius='lg'>
                  <Heading as='h3' color='pink.800'>
                    Bio
                  </Heading>
                  <Text fontSize='lg' lineHeight='base'>
                    {person.bio}
                  </Text>
                </GridItem>
                {!isOwner(id) &&
                  <GridItem rowSpan={3} colSpan={8} borderColor='gray.200' borderRadius='lg'>
                    <form action='submit' onSubmit={handleReview} >
                      <Flex>
                        <Heading as='h3' ml={3} color='pink.800'>
                    Review {person.firstName}
                        </Heading>
                        <Spacer />
                        <RadioGroup 
                          spacing={2} 
                          mt={2} 
                          name='rating' 
                          value={formdata.rating}>
                          <Stack direction="row">
                            <Radio 
                              isDisabled={error} 
                              isRequired 
                              isChecked={false} 
                              name='rating' 
                              value='1' 
                              onChange={handleChange}
                            >1<StarIcon mb={1} color='pink.800'/>
                            </Radio>
                            <Radio 
                              isDisabled={error} 
                              isChecked={false} 
                              name='rating' value='2' 
                              onChange={handleChange}
                            >2<StarIcon mb={1} color='pink.800'/>
                            </Radio>
                            <Radio
                              isDisabled={error} 
                              isChecked={false} 
                              name='rating' 
                              value='3' 
                              onChange={handleChange}
                            >3<StarIcon mb={1} color='pink.800'/>
                            </Radio>
                            <Radio 
                              isDisabled={error} 
                              isChecked={false} 
                              name='rating' 
                              value='4' 
                              onChange={handleChange}
                            >4<StarIcon mb={1} color='pink.800'/>
                            </Radio>
                            <Radio 
                              isDisabled={error} 
                              isChecked={false} 
                              name='rating' 
                              value='5' 
                              onChange={handleChange}
                            >5<StarIcon mb={1} color='pink.800'/>
                            </Radio>
                          </Stack>
                        </RadioGroup>
                        <Spacer />
                        <Button
                          isDisabled={error}
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
                          <InputLeftElement children={<ChatIcon />}/>
                          <Textarea
                            isDisabled={error}
                            isRequired
                            type='text'
                            pl={8}
                            size='lg'
                            name='text'
                            onChange={handleChange}
                            value={error ? 'You must have already attended an event with this person in order to leave a review!' : formdata.text}
                            placeholder={hasReviewed ? 'You can\'t review a person twice! Any changes you post will edit your existing review' : 'Think of something witty! Remember, you\'re being rated...'}
                            aria-label='review text'
                          />
                        </InputGroup>
                      </FormControl>
                    </form>
                  </GridItem>
                }
              </Grid>
            </Center>
          </Container>
          : 'loading'
        }
      </ChakraProvider>
    </>
  )
}

export default ProfileShow
 
{/* <ChakraProvider theme={theme}>
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
                  key={person._id}>
                  <Image boxShadow='lg' m={2} p={5} align='left'rounded='40px'src={person.profilePicture} />
                </Box>
                <Box border='5px' direction='column'm={5} p={5}>
                  <Heading size='20px'>Age: {person.age}</Heading>
                  <Heading size='20px'>Gender: {person.gender}</Heading>
                  <Heading size='20px'>Sexual Orientation: {person.sexualOrientation}</Heading>
                  <Heading size='20px'>Politics: {person.politics}</Heading>
                  <Heading size='20px'>Height: {person.height}</Heading>
                  <Heading size='20px'>Smoker: {person.isSmoker}</Heading>
                  <Heading size='20px'>Open to drugs: {person.isOpenToDrugs}</Heading>
                  <Heading size='20px'>Food Preferences: {person.foodPreferences}</Heading>
                </Box>
              </Flex>
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
              </Box >
              <Box m={5}>
                <Heading>Interests</Heading>
              </Box>
              <Stack isInline align='baseline'>
                <Box ml={5} justify='space-around'>
                  <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[0]}</Badge>
                  <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[1]}</Badge>
                  <Badge m={1} p={2} variant='solid' bg='pink.800' variantColor='white' rounded='full' px={2}>{person.interests[2]}</Badge>
                </Box>
              </Stack>
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
                  <Image src={person.eventsHostOf[0].imageURL} />
                </Box>
                <Box m={5}>
                  <Image src={person.eventsHostOf[0].imageURL} />
                </Box>
                <Box m={5}>
                  <Image src={person.eventsHostOf[0].imageURL} />
                </Box>
              </Flex>
              <Box ml={5} mr={5}>
                <Center height="50px">
                  <Divider orientation="horizontal" />
                </Center>
              </Box>
              <Box w='600px'm={5}>
                <FormControl id="email">
                  <FormLabel>Contact {person.firstName}</FormLabel>
                  <Input type="email" />
                  <FormHelperText>Say hi or ask a question about an upcoming event</FormHelperText>
                </FormControl>
              </Box>
            </Flex>
            <Box ml={5} mr={5}>
              <Center height="50px">
                <Divider orientation="horizontal" />
              </Center>
            </Box >
          </Box>
          :
          <Text>...loading</Text>
        }
      </ChakraProvider> */}