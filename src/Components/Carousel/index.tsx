'use client'

import React from 'react'
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import Main1 from '../../Assets/Images/main1.png'
import Main2 from '../../Assets/Images/main2.png'
import Main3 from '../../Assets/Images/main3.png'
import Main4 from '../../Assets/Images/main4.png'


const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function CaptionCarousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null)
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })
  const cards = [
    {
      title: '',
      text: "",
      image: Main1,
    },
    {
      title: '',
      text: "",
      image: Main2,
    },
    {
      title: '',
      text: "",
      image: Main3,
    },
    {
        title: '',
        text: "",
        image: Main4,
      },
  ]

  return (
    <Box position={'relative'} margin={'0 auto'} width={'100%'} overflow={'hidden'} >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      {/* <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={0}
        top={top}
        transform={'translate(0, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton> */}
      {/* Right Icon */}
      {/* <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton> */}
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'auto'} 
            minHeight={'600'}
            margin={'0 auto'}
            width={'100vw'}
            position="relative"
            top={top}
            
            backgroundPosition={'center top'}
            backgroundRepeat="no-repeat"
            backgroundSize="contain" 
            backgroundImage={`url(${card.image})`}>
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="full" width={'full'} position="relative">
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                margin={'0 auto'}
                position="absolute"
                top="top"
                transform="translate(0, -50%)">
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}