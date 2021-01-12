/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { 
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

import FormRegister from './FormRegister'
import FormLogIn from './FormLogIn'

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
                <Image 
                  src="https://www.wtso.com/blog/wp-content/uploads/2018/07/shutterstock_492006757.jpg" 
                  alt="dinner party photo" 
                  objectFit="fill"
                  align='left'
                />
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
                <FormLogIn />
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <FormRegister />
              </Box>
            </GridItem>

          </Grid>
        </Center>
      </Container>
    </ChakraProvider>
  )
}

export default SignUpLogIn