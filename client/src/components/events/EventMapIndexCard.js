import React from 'react'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Fonts from '../../styles/Fonts'
import ReactMapGL, { Marker } from 'react-map-gl'

function EventMapIndexCard() {
  const [viewport, setViewport] = React.useState(null)
  React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(postion => {
      const { coords: { latitude, longitude } } = postion
      setViewport({ longitude, latitude })
    })
  }, [])

  const theme = extendTheme({
    fonts: {
      heading: 'Dancing Script',
      body: 'Raleway'
    }
  })

  console.log(viewport)

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container>
        {viewport ?
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height="100%"
            width="100%"
            mapStyle='mapbox://styles/mapbox/outdoors-v11'
            zoom={15}
            longitude={viewport.longitude}
            latitude={viewport.latitude}
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
            >
            🤖
            </Marker>
          </ReactMapGL>
          :
          <h2>Finding your location.....</h2>
        }
      </Container>
    </ChakraProvider>
  )
}

export default EventMapIndexCard