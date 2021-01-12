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
  Divider
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

function Form() {
  return (
    <form action='submit'>
      <Stack spacing={2}>
        <FormControl isRequired>
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
        </FormControl>
        <Divider />
        <Button type='submit' variant='solid' variantcolour='blue'>
            Sign Up!
        </Button>
      </Stack>
    </form>

  )
}

export default Form