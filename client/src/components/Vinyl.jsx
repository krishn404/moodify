import vinyl from "../assets/vinyl.png"
import styled from "styled-components"

export default function Vinyl() {
    return(
        <Wrapper>
            <Image loading="lazy" src={vinyl}/>
        </Wrapper>
    )
}

const Image = styled.img`
    animation: rotation 5s infinite linear;
    margin-bottom:2em;
    max-width:20.5em;
    user-select:none;

    @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(359deg);
        }
    }
    @media only screen and (max-width: 600px) {
      width:230px;
    }
    @media only screen and (max-height: 740px) {
      width:170px;
    }

    
      `

const Wrapper = styled.div`
      text-align:center;
`