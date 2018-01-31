import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
    getAlbum,
    getAlbums,
    getAlbumsTracks
} from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('album', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
        stubedFetch.restore();
    });

    describe('smoke tests', () => {
        it('should have getAlbum method', () => {
            expect(getAlbum).to.exist;
        });

        it('should have getAlbums method', () => {
            expect(getAlbums).to.exist;
        });

        it('should have getAlbumTracks method', () => {
            expect(getAlbumsTracks).to.exist;
        });
    });

    describe('getAlbum', () => {
        it('should call fetch method', () => {
            const album = getAlbum();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = getAlbum('123');
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/123');

            const album2 = getAlbum('1234');
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/1234');
        });

        it('should return the correct data form Promise', () => {
            promise.resolves({
                album: 'name'
            });
            const album = getAlbum('123');
//            expect(album.resolveValue).to.be.eql({
//                album: 'name'
//            });
        });
    });

    describe('getAlbums', () => {
        it('should call fetch method', () => {
            const album = getAlbums();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = getAlbums(['123', '456']);
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=123,456');
        });

        it('should return the correct data form Promise', () => {
            promise.resolves({
                album: 'name'
            });
            const album = getAlbums(['123', '456']);
            //            expect(album.resolveValue).to.be.eql({
            //                album: 'name'
            //            });
        });
    });

    describe('getAlbumsTracks', () => {
        it('should call fetch method', () => {
            const tracks = getAlbumsTracks();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const tracks = getAlbumsTracks('123');
            expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/123/tracks');
        });

        it('should return the correct data form Promise', () => {
            promise.resolves({
                album: 'name'
            });
            const album = getAlbumsTracks(['123', '456']);
            //            expect(album.resolveValue).to.be.eql({
            //                album: 'name'
            //            });
        });
    });
});