import Vinyl from "./Vinyl"
import styled from "styled-components"
import { useEffect } from "react";

export default function EmotionVinyl({mood="HAPPY", hue="150", saturation="1"}) {
    


    return(
        <Wrapper style={{
            filter: `hue-rotate(${hue}deg) saturate(${saturation})`
        }}>
            <Vinyl/>
            <Mood>{mood}</Mood>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    

    &:hover{
        cursor:grab;
    }
`

const Mood = styled.p`
    position:relative;
    margin-top:-0.9em;

    background-color:white;
    font-size:4em;
    text-align:center;
    padding: 0em 0.2em;
`