import Login from "./components/Login"
import { token } from "./spotifyapi";
import { useState, useEffect } from "react";

import styled from "styled-components"
import Form from "./components/Form";
import {createGlobalStyle} from "styled-components"

function App() {

  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
        {accessToken ? 
        <Form/>
        : 
        <Login/>}
    </Wrapper>
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  body{
    transition: background-color 0.2s ease;
    background-color:#F97C7C;
  }

  p{
    font-family: 'VT323', monospace;
  }

  h1{
    font-family: 'Syne', sans-serif;
  }

  div{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
  }

  ::selection {
    background: white;
  }
`

const Wrapper = styled.div`
  max-width:43em;
  margin-left:auto;
  margin-right:auto;
`