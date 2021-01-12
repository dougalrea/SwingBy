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
  FormHelperText,
  StylesProvider
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'


function FormSignUp() {
  return (
    <form action='submit'>
      <Stack spacing={2}>
        <FormControl isRequired>
          <FormHelperText textAlign='center'>
          New to SwingBy? Sign up!
            <br />
            <br />
          </FormHelperText>
          <InputGroup>
            <InputLeftElement children={<EmailIcon />} />
            <Input type='email' placeholder='Email' aria-label='Email' />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input type='password' placeholder='Password' aria-label='Password' />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input type='password' placeholder='Confirm Password' aria-label='Password Confirmation' />
          </InputGroup>
          <FormHelperText textAlign='center'>
            We will never share your data
          </FormHelperText>
        </FormControl>
        <Divider />
        <Button
          type='submit' 
          variant='solid' 
          bg='pink.800'
          color='white'
          boxShadow='sm'
          _hover={{ boxShadow: 'md', bg: 'pink.700' }}
        >
            Sign Up!
        </Button>
      </Stack>
    </form>

  )
}

export default FormSignUp