import {API_URL, FETCH_CONFIG} from './config';
import {toJSON} from './utils';

export const getAlbum = (id) => {
    return fetch(`${API_URL}/albums/${id}`, FETCH_CONFIG)
        .then(toJSON);
};

export const getAlbums = (ids) => {
    return fetch(`${API_URL}/albums/?ids=${ids}`, FETCH_CONFIG)
        .then(toJSON);
};

export const getAlbumsTracks = (id) => {
    return fetch(`${API_URL}/albums/${id}/tracks`, FETCH_CONFIG)
        .then(toJSON);
};