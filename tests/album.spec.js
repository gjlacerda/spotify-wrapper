import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('album', () => {
    let spotifyWrapper;
    let stubedFetch;
    let promise;

    beforeEach(() => {
        spotifyWrapper = new SpotifyWrapper({
            token: 'foo'
        });
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
        stubedFetch.restore();
    });

    describe('smoke tests', () => {
        it('should have getAlbum method', () => {
            expect(spotifyWrapper.album.getAlbum).to.exist;
        });

        it('should have getAlbums method', () => {
            expect(spotifyWrapper.album.getAlbums).to.exist;
        });

        it('should have getAlbumTracks method', () => {
            expect(spotifyWrapper.album.getAlbumsTracks).to.exist;
        });
    });

    describe('getAlbum', () => {
        it('should call fetch method', () => {
            const album = spotifyWrapper.album.getAlbum();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = spotifyWrapper.album.getAlbum('123');
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/123');

            const album2 = spotifyWrapper.album.getAlbum('1234');
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/1234');
        });

        it('should return the correct data form Promise', () => {
            promise.resolves({
                album: 'name'
            });
            const album = spotifyWrapper.album.getAlbum('123');
           expect(album.resolveValue).to.be.eql({
               album: 'name'
           });
        });
    });

    describe('getAlbums', () => {
        it('should call fetch method', () => {
            const album = spotifyWrapper.album.getAlbums();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = spotifyWrapper.album.getAlbums(['123', '456']);
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=123,456');
        });

        it('should return the correct data form Promise', () => {
            promise.resolves({
                album: 'name'
            });
            const album = spotifyWrapper.album.getAlbums(['123', '456']);
            expect(album.resolveValue).to.be.eql({
                album: 'name'
            });
        });
    });

    describe('getAlbumsTracks', () => {
        it('should call fetch method', () => {
            const tracks = spotifyWrapper.album.getAlbumsTracks();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const tracks = spotifyWrapper.album.getAlbumsTracks('123');
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/123/tracks');
        });

        it('should return the correct data form Promise', () => {
            promise.resolves({
                album: 'name'
            });
            const album = spotifyWrapper.album.getAlbumsTracks(['123', '456']);
            expect(album.resolveValue).to.be.eql({
                album: 'name'
            });
        });
    });
});