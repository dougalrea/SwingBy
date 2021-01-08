/* eslint-disable no-unused-vars */
import React from 'react'
import { Box } from '@chakra-ui/react'

const handleChange = (e) => {
  const now = new Date(e.target.value)
  console.log(e.target.value, now.getTime())
}

function SignUpLogIn() {
  return (
    <>
      <h1>This is the sign up / log in page</h1>

      <section className="logIn">
        <form 
        
        >
          <label>Log in
            <input
              className="input emailField"
              type="text"
              placeholder="email address"
            />
            <input
              className="input passwordField"
              type="password"
              placeholder="password"
            />
            <label>
            Start time
              <input
                className="input start-time"
                type="datetime-local"
                placeholder={Date.now()}
                onChange={handleChange}
              />
            </label>
            <label>
            Duration
              <input
                className="input end-time"
                type="time"
                placeholder="hours"
                onChange={handleChange}
              />
            </label>
            
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
        <form>
          <label>Sign up
            <input
              className="input emailField"
              type="text"
              placeholder="email address"
            />
            <input
              className="input emailField"
              type="text"
              placeholder="full name"
            />
            <input
              className="input passwordField"
              type="password"
              placeholder="password"
            />
            <input
              className="input passwordField"
              type="password"
              placeholder="confirm password"
            />
          </label>
        </form>
      </section>
    </>
  )
}

export default SignUpLogIn