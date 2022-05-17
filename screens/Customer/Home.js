
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
                style={{ height: 320 }}
                    // loop
                    autoplay={true}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive/>}
                    paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                >

                    <CarouselImage source={require('../../assets/Swiper/swiper1.jpg')}
                    resizeMode="cover"
                    />
                    <CarouselImage source={require('../../assets/Swiper/swiper2.jpg')}
                    resizeMode="cover"
                    />
                    <CarouselImage source={require('../../assets/Swiper/swiper3.jpg')}
                    resizeMode="cover"
                    />
                    <CarouselImage source={require('../../assets/Swiper/swiper4.jpg')}
                    resizeMode="cover"
                    />
                </Swiper>
                <PageBody>

                </PageBody>
            </ScrollView>
        </Container>
    );
}

export default Home;