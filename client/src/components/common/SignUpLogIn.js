import React from 'react'

function SignUpLogIn() {
  return (
    <>
      <h1>This is the sign up / log in page</h1>

      <section className="logIn">
        <form>
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
          </label>
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