import styled from "styled-components"

export default function Button ({button=false, func=()=>{}, link="https://google.com", text="Default", color="white", targ=""}) {
    return (
        <>
            {button ? 
            <StyledButton type="submit" onClick={func} style={{color: color}} formTarget={targ}>{text}</StyledButton>
            :
            <StyledAnchor href={link} style={{color: color}}>{text}</StyledAnchor>}
        </>
    )
}

const StyledButton = styled.button`
    position:fixed;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -85%);

    width:342px;

    cursor:pointer;
    font-size: 2em;
    font-family: 'VT323', monospace;
    text-decoration:none;
    background-color:black;
    padding: 0.3em 1em;
    border-radius: 0.3em;
    border:none;
    text-align:center;

    transition:background-color 0.1s ease;
    &:hover{
        background-color:white;
    }
`

const StyledAnchor = styled.a`   
    font-size: 2em;
    font-family: 'VT323', monospace;
    text-decoration:none;
    background-color:black;
    padding: 0.3em 1em;
    border-radius: 0.3em;
    text-align:center;

    transition:background-color 0.1s ease;
    &:hover{
        background-color:white;
    }
`