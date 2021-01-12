/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
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
import { HamburgerIcon } from '@chakra-ui/icons'

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button
        onClick={onOpen}
        pos="fixed"
        ref={btnRef}
        m={1}
        colorScheme="teal"
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
            <DrawerHeader>Header</DrawerHeader>
            <DrawerBody>
              <Accordion defaultIndex={[1]} allowMultiple allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Info
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Link>
                      <Button
                        variant="ghost"
                        isFullWidth
                        height="26px"
                        justifyContent="flex-start"
                        borderRadius="0"
                        pl="0"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Link>
                      <Button
                        variant="ghost"
                        isFullWidth
                        height="26px"
                        justifyContent="flex-start"
                        borderRadius="0"
                        pl="0"
                      >
                        Events Hosting
                      </Button>
                    </Link>
                    <Link>
                      <Button
                        variant="ghost"
                        isFullWidth
                        height="26px"
                        justifyContent="flex-start"
                        borderRadius="0"
                        pl="0"
                      >
                        Events Attending
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
                    <Link>
                      <Button
                        variant="ghost"
                        isFullWidth
                        height="26px"
                        justifyContent="flex-start"
                        borderRadius="0"
                        pl="0"
                      >
                        Events
                      </Button>
                    </Link>
                    <Link>
                      <Button
                        variant="ghost"
                        isFullWidth
                        height="26px"
                        justifyContent="flex-start"
                        borderRadius="0"
                        pl="0"
                      >
                        People
                      </Button>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="red">Log Out</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default Nav