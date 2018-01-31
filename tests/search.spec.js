import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
    search,
    searchAlbums,
    searchArtists,
    searchTracks,
    searchPlaylists
} from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('search', () => {
    let fetchedStub;
    let promise;
    
    beforeEach(() => {
        fetchedStub = sinon.stub(global, 'fetch');
        promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
        fetchedStub.restore();
    });
    
    describe('smoke testes', () => {
        it('should exist the search method', () => {
            expect(search).to.exist;
        });

        it('should exist the searchAlbums method', () => {
            expect(searchAlbums).to.exist;
        });

        it('should exist the searchArtists method', () => {
            expect(searchArtists).to.exist;
        });

        it('should exist the searchTracks method', () => {
            expect(searchTracks).to.exist;
        });

        it('should exist the searchPlaylists method', () => {
            expect(searchPlaylists).to.exist;
        });
    });

    describe('generic search', () => {
        it('should call fetch function', () => {
            const artists = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should receive the correct URL', () => {
            context('passing one type', () => {
                const artists = search('Incubus', 'artist');
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    
                const albuns = search('Incubus', 'album');
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
            });

            context('passing mora than one type', () => {
                const artistsAndAlbums = search('Incubus', ['artist', 'album']);
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            promise.resolves({body: 'json'});
            const artists = search('Incubus', 'artist');
            //expect(artists.resolveValue).to.be.eql({body: 'json'});
        });
    });

    describe('search artists', () => {
        it('should call fetch function', () => {
            const artists = searchArtists('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const artists = searchArtists('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

            const artists2 = searchArtists('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
        });
    });

    describe('search albums', () => {
        it('should call fetch function', () => {
            const album = searchAlbums('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = searchAlbums('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

            const album2 = searchAlbums('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
        });
    });

    describe('search tracks', () => {
        it('should call fetch function', () => {
            const tracks = searchTracks('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const tracks = searchTracks('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

            const album2 = searchTracks('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
        });
    });

    describe('search playlists', () => {
        it('should call fetch function', () => {
            const playlists = searchPlaylists('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const playlists = searchPlaylists('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

            const playlists2 = searchPlaylists('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
        });
    });
});