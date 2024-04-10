import { getAllArtistAlbums, getAllTracks, getAllMultipleAudio, getTracks, getUser, createPlaylist, addTracksToPlaylist, followPlaylist} from "../spotifyapi"
import { useState, useEffect, useMemo } from "react"
import { catchAsync, shuffle } from "../utils"
import Loader from "./Loader"
import styled from "styled-components"
import SpotifyLogo from "./SpotifyLogo"
import { SubTitle, Title } from "./styles"
import Button from "./Button"

export default function Playlist({data}) {
    const {artists, mood} = data
    /*

    Happy
    valence > 0.7

    Sad
    valence < 0.3

    Dance
    danceability > 0.7

    Energetic
    energy > 0.7

    Chill
    tempo < 90 bpm
    energy < 0.3

    */
   const moodFilter = (mood, data) => {
        if (mood === "happy") {
            return data.valence > 0.7
        }
        else if (mood === "sad") {
            return data.valence < 0.3
        }
        else if (mood === "dance") {
            return data.danceability > 0.7
        }
        else if (mood === "energetic") {
            return data.energy > 0.7
        }
        else if (mood === "chill") {
            return data.tempo < 90 && data.energy < 0.5
        }

   }

    function msToMMSS(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    const [allArtistAlbums, setAllArtistAlbums] = useState([])
    const [allTracks, setAllTracks] = useState([])
    const [allData, setAllData] = useState([])
    const [playlist, setPlaylist] = useState([])
    const [userId, setUserId] = useState(null)
    const [spotifyPlaylist, setSpotifyPlaylist] = useState(null)
    const [url, setUrl] = useState(null)
    
    useEffect(() => {
        document.body.style = 'background: #EFAFFF;';
        const fetchData = async () => {
            const {res} = await getAllArtistAlbums(artists)
            setAllArtistAlbums(res.map(sub => sub.data.items).map(sub => sub.map(a => a.id)).flat()) //extracts only ids
        }
        catchAsync(fetchData())
    }, [artists])

    useEffect(() => {
        const fetchData = async () => {
            const {res} = await getAllTracks(allArtistAlbums)
            setAllTracks(res.map(sub => sub.data.items).map(sub => sub.map(t => t.id)).flat())
        }
        catchAsync(fetchData())
    }, [allArtistAlbums])

    useEffect(() => {
        const fetchData = async () => {
            const chunkSize = 100
            const dividedQuadrants = Array.from(
                { length: Math.ceil(allTracks.length / chunkSize) },
                (_, index) => allTracks.slice(index * chunkSize, (index + 1) * chunkSize)
              );

            const {res} = await getAllMultipleAudio(dividedQuadrants)
            setAllData(res.map(sub => sub.data.audio_features).flat())
        }
        catchAsync(fetchData())
    }, [allTracks])

    useEffect(() => {
        const parseData = async () => {
            shuffle(allData) //randomize tracks
            const result = allData.filter(data => moodFilter(mood, data))
            shuffle(result)
            const playlist = result.slice(0,20).map(sub => sub.id)
            const {data} = await getTracks(playlist)
            const {tracks} = data
            //console.log(tracks)
            setPlaylist(tracks)
        }
        catchAsync(parseData())
    }, [allData, mood]) //<p>name: {name}, by: {artists[0].name} </p>

    useEffect(() => {
        const fetchUser = async() => {
            const {data} = await getUser()
            setUserId(data.id)
        }
        catchAsync(fetchUser())
    }, [])

    useEffect(() => {
        const createList = async() => {
            if (!userId) return

            const name = `${mood} playlist`
            const {data} = await createPlaylist(userId, name.toUpperCase())
            setUrl(data.external_urls.spotify)
            setSpotifyPlaylist(data.id)
        }
        catchAsync(createList())
    }, [userId])

    useEffect(() => {
        const addTracks = async () => {
            const uris = playlist.map((({uri}) => uri)).join(',')
            const {data} = await addTracksToPlaylist(spotifyPlaylist, uris)
            if (data) {
                await followPlaylist(spotifyPlaylist)
            }
        }
        catchAsync(addTracks())
    }, [playlist, spotifyPlaylist])



    return(
        <>
        <Wrapper>
            <SpotifyLogo/>
            <Title>YOUR CURATED PLAYLIST</Title>
            <SubTitle>SUCCESSFULLY IMPORTED TO YOUR SPOTIFY ACCOUNT, HAPPY LISTENING ❤️</SubTitle>
            {playlist.length >= 20 ?
            (playlist.map(({name, artists, duration_ms, album, external_urls}, i) => (
                <Song href={external_urls.spotify} target="_blank" key={i}>
                    <Image loading="lazy" src={album.images[2].url}/>
                    <Text>
                        <SongTitle>{name}</SongTitle>
                        <Artists>{artists.map(sub => sub.name).join(', ')}</Artists>
                    </Text>
                    <Time>{msToMMSS(duration_ms)}</Time>
                </Song>
            )))
            :
            <Loader/>
            }
        </Wrapper>
        {url ? <Button button={true} text="LISTEN ON SPOTIFY" color={"#EFAFFF"} func={() => (window.open(url, '_blank'))} /> : <Button button={true} text="LOADING" color={"#EFAFFF"}/> }
        </>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:14em;
`

const Song = styled.a`
    display:flex;
    align-items:center;
    padding: 0.3em 0.5em;
    border-radius:0.3em;
    text-decoration:none;
    &:hover{
        cursor:pointer;
        background-color: #EA97FF;

    }
`

const Image = styled.img`

`

const Text = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:0.93em;
`

const SongTitle = styled.div`
    font-size:0.8125em;
    font-weight:400;
    margin-bottom:0.1em;
    color:black;
`

const Artists = styled.div`
    font-size:0.65em;
    font-weight:400;
    color: #494949;
`

const Time = styled.div`
    font-size:0.65em;
    margin-left:auto;
    color:black;
`
