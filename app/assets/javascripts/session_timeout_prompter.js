"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerPinger = (function () {
  function ServerPinger(pingPath) {
    _classCallCheck(this, ServerPinger);

    this.pingPath = pingPath;
    this.lastPinged = undefined;
  }

  _createClass(ServerPinger, [{
    key: "pingServerNow",
    value: function pingServerNow() {
      var _this = this;

      $.post(this.pingPath, function () {
        _this.lastPinged = _this.currentTime();
      });
    }
  }, {
    key: "currentTime",
    value: function currentTime() {
      return Math.floor(new Date().getTime() / 1000);
    }
  }]);

  return ServerPinger;
})();
