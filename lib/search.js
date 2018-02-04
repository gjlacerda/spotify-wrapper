'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {
        artists: searcher.bind(this, 'artist'),
        albums: searcher.bind(this, 'album'),
        tracks: searcher.bind(this, 'track'),
        playlists: searcher.bind(this, 'playlist')
    };
};

function searcher(type, query) {
    return this.request(this.apiURL + '/search?q=' + query + '&type=' + type);
}