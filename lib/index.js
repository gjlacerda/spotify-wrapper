'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _album = require('./album');

var _album2 = _interopRequireDefault(_album);

var _config = require('./config');

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