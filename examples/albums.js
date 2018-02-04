import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
    token: 'BQAZu0ZZp41lBtJkVV89Tu-aa68PEwE_xPPhPr4yNrtWsS3j7RnPyZbyKlUZzOXRVBPAs-q80M9M_621taxqd8SDo7CB7cpTGYMD0wL3z9xz0WBrXtu8Tj7Rt3mWYtWprTjESBpIRjnFeYE'
});
const albums = spotify.search.albums('Incubus');
albums.then(data => console.log(data));