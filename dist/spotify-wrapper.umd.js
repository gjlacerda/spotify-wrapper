(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SpotifyWrapper"] = factory();
	else
		root["SpotifyWrapper"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _search = __webpack_require__(1);

var _search2 = _interopRequireDefault(_search);

var _album = __webpack_require__(2);

var _album2 = _interopRequireDefault(_album);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpotifyWrapper = function () {
    function SpotifyWrapper() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, SpotifyWrapper);

        this.apiURL = params.apiURL || _config.API_URL;
        this.token = params.token;
        this.album = _album2.default.bind(this)();
        this.search = _search2.default.bind(this)();
    }

    _createClass(SpotifyWrapper, [{
        key: 'request',
        value: function request(url) {
            var params = {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            };
            return fetch(url, params).then(function (response) {
                return response.json();
            });
        }
    }]);

    return SpotifyWrapper;
}();

module.exports = SpotifyWrapper;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var _this = this;

    return {
        getAlbum: function getAlbum(id) {
            return _this.request(_this.apiURL + "/albums/" + id);
        },
        getAlbums: function getAlbums(ids) {
            return _this.request(_this.apiURL + "/albums/?ids=" + ids);
        },
        getAlbumsTracks: function getAlbumsTracks(id) {
            return _this.request(_this.apiURL + "/albums/" + id + "/tracks");
        }
    };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var API_URL = exports.API_URL = 'https://api.spotify.com/v1';

var FETCH_CONFIG = exports.FETCH_CONFIG = {
    headers: {
        'Authorization': 'Bearer BQCDt24npGlevr6zVuBawlVZHap_8p7ZDDsRVojJ-6QTlcBl49oVBHwi9qWy9_8FhaHJ6Nbb_qj6dL6x2chmu54cOvf4TuEuRgQ7e6pf44AV1n2990U63rGOmZ1umcMtAvv5y7AnX5Pv7s8'
    }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=spotify-wrapper.umd.js.map