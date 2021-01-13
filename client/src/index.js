import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import 'mapbox-gl/dist/mapbox-gl.css'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root'))