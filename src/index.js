import {
    search,
    searchAlbums,
    searchArtists,
    searchPlaylists,
    searchTracks
} from './search';
import {
    getAlbum,
    getAlbums,
    getAlbumsTracks
} from './album';
import {API_URL} from './config';

export default class SpotifyWrapper {
    constructor(params = {}) {
        this.apiURL = params.apiURL || API_URL;
        this.token = params.token;
    }

    request(url) {
        const params = {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        };
        return fetch(url, params);
    }
}