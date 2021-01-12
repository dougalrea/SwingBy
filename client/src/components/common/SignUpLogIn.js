/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { 
  Input, 
  InputLeftAddon, 
  Icon, 
  InputGroup, 
  InputLeftElement, 
  Stack, 
  Button,
  FormControl,
  Divider,
  Container,
  Box,
  Grid,
  GridItem,
  Image,
  AspectRatio,
  Heading,
  Center,
  ChakraProvider
} from '@chakra-ui/react'

import Fonts from '../../styles/Fonts'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script'
  }
})

import Form from './Form'

function SignUpLogIn() {
  return (
    <ChakraProvider theme={theme}>
      <Container  
        bg='gray.100'
        maxW='100%'
        h='100vh'>
        <Center>
          <Grid
            bg='white'
            padding='10px'
            borderWidth='1px' 
            borderRadius='lg'
            marginTop='10%'
            w='80ch'
            h='40ch'
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={10} >
              <AspectRatio maxH='100%' ratio={5 / 14} borderRadius='lg' overflow='hidden'>
                <Image src="https://media.istockphoto.com/photos/young-adults-socialising-at-a-party-at-home-elevated-view-picture-id684006654?k=6&m=684006654&s=612x612&w=0&h=NVK58_xE9qT0PFWvO7IugUbrVvfIZgTeKghZtzq7aZY=" alt="naruto" objectFit="fill" />
              </AspectRatio>
            </GridItem>
            <GridItem colSpan={14} >
              <Box>
                <Fonts />
                <Center>
                  <Heading as='h1' fontSize='96px' color='pink.800'>
                  SwingBy
                  </Heading>
                </Center>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Form />
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Form />
              </Box>
            </GridItem>

          </Grid>
        </Center>
      </Container>
    </ChakraProvider>
  )
}

export default SignUpLogIn