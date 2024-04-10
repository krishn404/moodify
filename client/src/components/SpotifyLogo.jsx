import styled from "styled-components"
import spotifylogo from "../assets/spotifylogo.png"

export default function SpotifyLogo() {
    return <Image loading="lazy" src={spotifylogo}></Image>
}

const Image = styled.img`
    margin-left:auto;
    width:35px;
    height:35px;
    margin-bottom:1em;
    margin-top:1.5em;
`