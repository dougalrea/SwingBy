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
import { useHistory } from 'react-router-dom'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

import useForm from '../utils/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function FormLogIn() {

  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm(
    {
      email: '',
      password: ''
    }
  )

  const handleLogIn = async event => {
    event.preventDefault()
    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/events')
    } catch (err) {
      setError(true)
    }
  }
  const handleFocus = () => {
    setError(false)
  }

  return (
    <form action='submit' onSubmit={handleLogIn}>
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
              name='email'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formdata.email}
              placeholder='demo@account.com' 
              aria-label='Email' />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input 
              type='password'
              name='password'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formdata.password}
              placeholder='GetMeInvolved' 
              aria-label='Password' />
          </InputGroup>
          
          {error ? <FormHelperText textAlign='center' paddingTop='15px' paddingBottom='16px' color='red.500'>Sorry, the username or password is incorrect</FormHelperText> : <FormHelperText textAlign='center' paddingTop='7px' paddingBottom='7px'>Alternatively, use the demo account details provided to experience full site features</FormHelperText>}
          
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