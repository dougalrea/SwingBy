/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Stack, 
  Button,
  FormControl,
  Divider,
  FormHelperText
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import useForm from '../utils/useForm'
import { registerUser } from '../../lib/api'


function FormRegister() {
  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleRegister = async event => {
    event.preventDefault()
    try {
      await registerUser(formdata)
      history.push('/events')
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  return (
    <form action='submit' onSubmit={handleRegister}>
      <Stack spacing={2}>
        <FormControl isRequired>
          <FormHelperText textAlign='center'>
          New to SwingBy? Sign up!
            <br />
            <br />
          </FormHelperText>
          <InputGroup>
            <InputLeftElement children={<EmailIcon />} />
            <Input 
              type='email'
              name='email'
              onFocus={handleFocus}
              onChange={handleChange}
              value={formdata.email}
              placeholder='Email' 
              aria-label='Email' 
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input 
              type='password'
              name='password'
              onFocus={handleFocus}
              onChange={handleChange}
              value={formdata.password}
              placeholder='Password' 
              aria-label='Password' />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input 
              type='password'
              name='passwordConfirmation'
              onFocus={handleFocus}
              onChange={handleChange}
              value={formdata.passwordConfirmation}
              placeholder='Confirm Password' 
              aria-label='Password Confirmation' />
          </InputGroup>
          {error ? <FormHelperText textAlign='center' color='red.500'>
            Your passwords do not match!
          </FormHelperText> : <FormHelperText textAlign='center'>
            We will never share your data
          </FormHelperText>}
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

export default FormRegister