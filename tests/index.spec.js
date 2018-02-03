import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';
import {API_URL} from '../src/config';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('spotifyWrapper library', () => {
    it('should create an instance of SpotifyWrapper', () => {
        const spotifyWrapper = new SpotifyWrapper();
        expect(spotifyWrapper).to.be.an.instanceOf(SpotifyWrapper);
    });

    it('should receive apiURL as an option', () => {
        const spotifyWrapper = new SpotifyWrapper({
            apiURL: 'foo'
        });
        expect(spotifyWrapper.apiURL).to.be.equal('foo');
    });
    
    it('should use the default apiURL if not provided', () => {
        const spotifyWrapper = new SpotifyWrapper();
        expect(spotifyWrapper.apiURL).to.be.equal(API_URL);
    });

    it('should receive token as an option', () => {
        const spotifyWrapper = new SpotifyWrapper({
            token: 'foo'
        });
        expect(spotifyWrapper.token).to.be.equal('foo');
    });
});

describe('request method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
        stubedFetch.restore();
    });
    
    it('should have request method', () => {
        const spotifyWrapper = new SpotifyWrapper();
        expect(spotifyWrapper.request).to.exist;
    });

    it('should call fetch when request', () => {
        const spotifyWrapper = new SpotifyWrapper();
        spotifyWrapper.request('foo');
        expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with right url passed', () => {
        const spotifyWrapper = new SpotifyWrapper();
        spotifyWrapper.request('foo');
        expect(stubedFetch).to.have.been.calledWith('foo');
    });

    it('should call fetch with right headers passed', () => {
        const spotifyWrapper = new SpotifyWrapper({
            token: 'foo'
        });
        const params = {
            headers: {
                'Authorization': 'Bearer foo'
            }
        };
        spotifyWrapper.request('foo');
        expect(stubedFetch).to.have.been.calledWith('foo', params);
    });
});