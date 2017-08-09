"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerPinger = (function () {
  function ServerPinger(pingPath) {
    _classCallCheck(this, ServerPinger);

    this.pingPath = pingPath;
    this.lastPingedAt = undefined;
  }

  _createClass(ServerPinger, [{
    key: "pingServerNow",
    value: function pingServerNow() {
      $.post(this.pingPath, this.setLastPingedAt);
    }
  }, {
    key: "pingServerWithThrottling",
    value: function pingServerWithThrottling() {
      var ms_to_throttle = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

      if (!this.lastPingedAt || this.currentTime() - this.lastPingedAt > ms_to_throttle) {
        this.pingServerNow();
      }
    }

    // Private

  }, {
    key: "setLastPingedAt",
    value: function setLastPingedAt() {
      this.lastPingedAt = this.currentTime();
    }
  }, {
    key: "currentTime",
    value: function currentTime() {
      return Math.floor(new Date().getTime() / 1000);
    }
  }]);

  return ServerPinger;
})();
