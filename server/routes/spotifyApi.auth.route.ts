// import express = require('express');
import * as querystring from "querystring";
let client_id = 'CLIENT_ID';
let redirect_uri = 'http://localhost:3000/callback';

const router = require('express').Router();

function generateRandomString(number: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < number; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

router.get('/login', function(_req: any, res: { redirect: (arg0: string) => void; }) {

    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: 'a6f013d31ab14767a459eef1f324ca27',
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

});



router.get('/callback', function(req: { query: { code: any; state: any; }; }, res: { redirect: (arg0: string) => void; }) {

    let code = req.query.code || null;
    let state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        let client_secret='2bc2ad53557e4b3a836d5d6c0d8c990d'
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
    }
});

router.get('/spotify_login',(req:any,res:any)=>{
    res.redirect(('http://localhost:5000/api/spotify/login'))
})



export const spotifyRouter = router;
