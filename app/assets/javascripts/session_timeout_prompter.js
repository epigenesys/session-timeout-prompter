"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = (function () {
  function Player() {
    _classCallCheck(this, Player);
  }

  _createClass(Player, [{
    key: "play",
    value: function play(song) {
      this.currentlyPlayingSong = song;
      this.isPlaying = true;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPlaying = false;
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this.isPlaying) {
        throw new Error("song is already playing");
      }

      this.isPlaying = true;
    }
  }, {
    key: "makeFavorite",
    value: function makeFavorite() {
      this.currentlyPlayingSong.persistFavoriteStatus(true);
    }
  }]);

  return Player;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Song = (function () {
  function Song() {
    _classCallCheck(this, Song);
  }

  _createClass(Song, [{
    key: "persistFavoriteStatus",
    value: function persistFavoriteStatus(value) {
      // something complicated
      throw new Error("not yet implemented");
    }
  }]);

  return Song;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Moo = (function () {
  function Moo() {
    _classCallCheck(this, Moo);
  }

  _createClass(Moo, [{
    key: 'moo',
    value: function moo() {
      return 'Moooo!';
    }
  }]);

  return Moo;
})();
