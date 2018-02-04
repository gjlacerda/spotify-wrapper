import search from './search';
import album from './album';
import {API_URL} from './config';

export default class SpotifyWrapper {
    constructor(params = {}) {
        this.apiURL = params.apiURL || API_URL;
        this.token = params.token;
        this.album = album.bind(this)();
        this.search = search.bind(this)();
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