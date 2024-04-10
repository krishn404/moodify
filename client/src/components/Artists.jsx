import { useState, useEffect } from "react"
import { getTopArtists } from "../spotifyapi"
import { catchAsync } from "../utils"
import Loader from "./Loader"
import styled from "styled-components"
import { SubTitle, Title } from "./styles"
import SpotifyLogo from "./SpotifyLogo"
import Artist from "./Artist"

export default function Artists({artists, updateFields}) {
    const [topArtists, setTopArtists] = useState(null)

    const initialActivity = Array.from({ length: 20 }, () => false);
    const [activity, setActivity] = useState(initialActivity) //must initialize all to false TODO.


    const handleAll = (id, i) => {
        updateFields(id)
        handleClick(i)
    }

    const handleClick = (i) => {
        const updatedActivity = [...activity] //if past 5, new elements cannot be toggled
        if (updatedActivity.filter(x => x).length >= 5) {
            if (updatedActivity[i]) {
                updatedActivity[i] = !updatedActivity[i]
            }
        } else {
            updatedActivity[i] = !updatedActivity[i]
        }
        setActivity(updatedActivity)
    }


    useEffect(() => {
        document.body.style = 'background: #6BFFB8;';
        const fetchData = async () => {
            const {data} = await getTopArtists()
            setTopArtists(data)
        }
        catchAsync(fetchData()) //onClick={() => updateFields(id)}
    }, [])
    return (

        <Wrapper>
            <SpotifyLogo/>
            <Title>FAVOURITE ARTISTS?</Title>
            <SubTitle>CHOOSE 5 ARTISTS TO MATCH YOUR MOOD</SubTitle> 
            {topArtists ? 
            <ArtistList>
                {(topArtists.items.map(({id, external_urls, name, images}, i) => (    
                    <div id={id} onClick={() => handleAll(id, i)} key={i}>
                        <Artist name={name} images={images} isActive={activity[i]}/>
                    </div>
                ))   
                )}
            </ArtistList>
            : 
            <Loader/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`

const ArtistList = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:center;
    gap:0.2em;
    margin-bottom:14em;
`


