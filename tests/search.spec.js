import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');
global.Headers = () => {};

describe('search', () => {
    let spotifyWrapper;
    let fetchedStub;
    let promise;
    
    beforeEach(() => {
        spotifyWrapper = new SpotifyWrapper({
            token: 'foo'
        });
        fetchedStub = sinon.stub(global, 'fetch');
        promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
        fetchedStub.restore();
    });
    
    describe('smoke testes', () => {
        it('should exist the albums method', () => {
            expect(spotifyWrapper.search.albums).to.exist;
        });

        it('should exist the artists method', () => {
            expect(spotifyWrapper.search.artists).to.exist;
        });

        it('should exist the tracks method', () => {
            expect(spotifyWrapper.search.tracks).to.exist;
        });

        it('should exist the playlists method', () => {
            expect(spotifyWrapper.search.playlists).to.exist;
        });
    });

    describe('search artists', () => {
        it('should call fetch function', () => {
            const artists = spotifyWrapper.search.artists('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const artists = spotifyWrapper.search.artists('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

            const artists2 = spotifyWrapper.search.artists('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
        });
    });

    describe('search albums', () => {
        it('should call fetch function', () => {
            const album = spotifyWrapper.search.albums('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = spotifyWrapper.search.albums('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

            const album2 = spotifyWrapper.search.albums('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
        });
    });

    describe('search tracks', () => {
        it('should call fetch function', () => {
            const tracks = spotifyWrapper.search.tracks('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const tracks = spotifyWrapper.search.tracks('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

            const album2 = spotifyWrapper.search.tracks('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
        });
    });

    describe('search playlists', () => {
        it('should call fetch function', () => {
            const playlists = spotifyWrapper.search.playlists('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const playlists = spotifyWrapper.search.playlists('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

            const playlists2 = spotifyWrapper.search.playlists('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
        });
    });
});