// import Q from "q";
// import SpotifyWebApi from "spotify-web-api-js";

// let Spotify = require('spotify-web-api-js');
// let spotify = new Spotify();
//s.searchTracks()...

// let spotifyApi = new SpotifyWebApi();
// spotifyApi.setAccessToken('a6f013d31ab14767a459eef1f324ca27');
// spotifyApi.setPromiseImplementation(Q);
//
// // / get Elvis' albums, using Promises through Promise, Q or when
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function (data) {
//         console.log('Artist albums', data);
//     },
//     function (err) {
//         console.error(err);
//     });
//
// spotifyApi.getMe().then((res)=>console.log(res))




import {useEffect} from "react";
import axios from "axios";

const MusicLibrary=()=>{

    useEffect(()=>{
        axios.get('http://localhost:5000/api/spotify/spotify_login').then((res)=>console.log(res))
    })

return <></>

}

export default MusicLibrary
