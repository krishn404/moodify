import styled from "styled-components"
import { useState } from "react"

export default function Artist({name, images, isActive}) {
    //const [active, setActive] = useState(false) //onClick={() => setActive(!active)} 
    return (
        <Wrapper isActive={isActive}> 
            <Image loading="lazy" src={images[2].url}/>
            <Name>{name}</Name>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 1em 1em;
    transition: background-color 0.1s ease;
    background-color: ${props => (props.isActive ? '#8BCDAD' : '')};
    border-radius:0.8em;
    border: solid 1px rgba(211, 220, 50, 0);
    &:hover{
        cursor: pointer;
        border-radius:0.2em;
        border: solid 1px;
    }
`

const Image = styled.img`
    width:130px;
    height:130px;
    border-radius:50%;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
`

const Name = styled.p`
    position:relative;
    margin-top:-0.9em;

    background-color:white;
    font-size:1.25em;
    text-align:center;
    padding: 0.1em 0em;
`