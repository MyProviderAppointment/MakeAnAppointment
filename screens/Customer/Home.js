
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import {
    InnerContainer,
    StyledContainer,
    StyledTextInput,
    CarouselImage,
    TopHalf,
    BottomHalf,
    Container,
    WelcomeContainer,
    PageBody,
    SwipeDot,
    SwipeDotActive
} from '../../components/styles';

const Home = () => {
    return (
        <Container>
            <ScrollView>
                <Swiper
                    style={styless.swiper}
                    // loop
                    autoplay={true}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive/>}
                    paginationStyle={{top: 15, right: 15, bottom: null, left: null}}

                >

                    <CarouselImage 
                    source={require('../../assets/Swiper/swiper1.png')}
                    resizeMode="cover"
                    style={styless.carousel}
                    />
                    <CarouselImage 
                    style={styless.carousel}
                    source={require('../../assets/Swiper/swiper2.png')}
                    resizeMode="cover"
                    />
                    <CarouselImage source={require('../../assets/Swiper/swiper3.png')}
                    resizeMode="cover"
                    style={styless.carousel}
                    />
                    <CarouselImage source={require('../../assets/Swiper/swiper4.png')}
                    resizeMode="cover"
                    style={styless.carousel}
                    />
                </Swiper>
                <PageBody style={styless.body}>

                </PageBody>
            </ScrollView>
        </Container>
    );
}

const styless = StyleSheet.create({
    swiper: { 
        backgroundColor: '#ffffff',
        // borderBottomRightRadius: 0,
        // marginBottom: 0,
        height: 320, 
        // overflow: 'hidden',
        // borderBottomLeftRadius: 500,
        // marginBottom: 90,

    },
    carousel: { 
        // backgroundColor: '#ffffff',
        // borderBottomLeftRadius: (90),
        // borderBottomLeftRadius: (40, 80),
        marginBottom: -90,

        // height: 320, 
        // overflow: 'hidden',

    },
    body: { 
        backgroundColor: '#ffffff',
        // borderTopRightRadius: (5, 90),
        // borderTopRightRadius: (360, 40),
        // marginTop: -40,
        height: 590, 
        // overflow: 'hidden',

    },
    checkbox: {
        width: 30,
        height: 30,
        marginRight: 20,
        
    },
    
  });
  
export default Home;