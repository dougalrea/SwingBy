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
  FormHelperText
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'


function FormLogIn() {
  return (
    <form action='submit'>
      <Stack spacing={2}>
        <FormControl isRequired>
          <FormHelperText textAlign='center'>
          Already have an account? Log in!
            <br />
            <br />
          </FormHelperText>
          <InputGroup>
            <InputLeftElement children={<EmailIcon />} />
            <Input 
              type='email' 
              placeholder='demo@account.com' 
              aria-label='Email' />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input 
              type='password' 
              placeholder='GetMeInvolved' 
              aria-label='Password' />
          </InputGroup>
          <FormHelperText textAlign='center' paddingTop='7px' paddingBottom='7px'>
            Alternatively, use the demo account details provided to experience full site features
          </FormHelperText>
        </FormControl>
        <Divider />
        <Button 
          type='submit' 
          variant='solid' 
          bg='pink.800'
          color='white'
          boxShadow='sm'
          _hover={{ boxShadow: 'md', bg: 'pink.700' }}>
            Log in
        </Button>
      </Stack>
    </form>

  )
}

export default FormLogIn