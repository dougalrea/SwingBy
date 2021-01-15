import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'
import { HamburgerIcon, ArrowRightIcon } from '@chakra-ui/icons'

import { useLocation } from 'react-router-dom'
import { logoutUser, getPayload } from '../../lib/auth'

function Nav() {
  const [isVisible, setIsVisible] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { pathname } = useLocation()
  const history = useHistory()

  React.useEffect(() => {
    setIsVisible(pathname !== '/')
  }, [pathname])

  const handleLogout = () => {
    logoutUser()
    history.push('/')
  }

  return (
    <>
      {isVisible &&
      <>
        <Button
          onClick={onOpen}
          pos="fixed"
          ref={btnRef}
          mt={3}
          ml={10}
          bg='pink.800'
          color='white'
          boxShadow='sm'
          _hover={{ boxShadow: 'md', bg: 'pink.700' }}
        >
          <HamburgerIcon /> 
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="left"
          size="xs"
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Username</DrawerHeader>
              <DrawerBody>
                <Accordion defaultIndex={[0,1]} allowMultiple allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Info
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Link to={`/people/${getPayload().sub}`}>
                        <Button
                          variant="ghost"
                          isFullWidth
                          height="26px"
                          justifyContent="flex-start"
                          borderRadius="0"
                          pl="0"
                        >
                          <ArrowRightIcon mr={3}/>Profile
                        </Button>
                      </Link>
                      <Link to='/events/create'>
                        <Button
                          variant="ghost"
                          isFullWidth
                          height="26px"
                          justifyContent="flex-start"
                          borderRadius="0"
                          pl="0"
                        >
                          <ArrowRightIcon mr={3}/>Create Event
                        </Button>
                      </Link>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Browse
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Link to='/events'>
                        <Button
                          variant="ghost"
                          isFullWidth
                          height="26px"
                          justifyContent="flex-start"
                          borderRadius="0"
                          pl="0"
                        >
                          <ArrowRightIcon mr={3}/>Events
                        </Button>
                      </Link>
                      <Link to='/people'>
                        <Button
                          variant="ghost"
                          isFullWidth
                          height="26px"
                          justifyContent="flex-start"
                          borderRadius="0"
                          pl="0"
                        >
                          <ArrowRightIcon mr={3}/>People
                        </Button>
                      </Link>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </DrawerBody>
              <DrawerFooter>
                <Button colorScheme="red" onClick={handleLogout}>Log Out</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
      }
    </>
  )
}

export default Nav