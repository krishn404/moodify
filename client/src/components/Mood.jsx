import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import EmotionVinyl from './EmotionVinyl';
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { SubTitle, Title } from './styles';
import SpotifyLogo from './SpotifyLogo';

export default function Mood({mood, updateFields}) {
    const [activeIndex, setActiveIndex] = useState(1)
    const moods = ["happy", "sad", "dance", "energetic", "chill"]
    const colors = ["#C8FF83", "#7BB0FF", "#FF96E2", "#F77C7D", "#AAA3FF"]
    useEffect(() => {
        document.body.style = 'background: #C8FF83;';

    }, [])
    const onSlideChange = (index) => {
        setActiveIndex(index)
        document.body.style = `background: ${colors[index]};`;
        updateFields({mood: moods[index]})
    }
    return (
        <>
                <Test>
        <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="mySwiper" onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}>
                <SwiperSlide><EmotionVinyl color="#C8FF83" mood="HAPPY" hue="150"/></SwiperSlide>
                <SwiperSlide><EmotionVinyl color="#C8FF83" mood="SAD" hue="210"/></SwiperSlide>
                <SwiperSlide><EmotionVinyl color="#C8FF83" mood="DANCE" hue="300"/></SwiperSlide>
                <SwiperSlide><EmotionVinyl color="#CCFF00" mood="ENERGETIC" hue="7"/></SwiperSlide>
                <SwiperSlide><EmotionVinyl color="#C8FF83" mood="CHILL" hue="270"/></SwiperSlide>
        </Swiper></Test>
        <Wrapper>
            <SpotifyLogo/>
            <Title>HOW ARE YOU FEELING?</Title>
            <SubTitle>SET THE MOOD OF YOUR PLAYLIST</SubTitle>
        </Wrapper>

        </>
    )
}

const Wrapper = styled.div`
    position:absolute;
    top:0;
    display:flex;
    flex-direction:column;
    margin-right:1em;
    margin-top:0;
`

const Test = styled.div`
    margin-top:15em;
    --swiper-navigation-color: white;
    --swiper-pagination-color:white;
`
