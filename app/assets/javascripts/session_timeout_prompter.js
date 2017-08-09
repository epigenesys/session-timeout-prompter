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
      jQuery.post(this.pingPath, this.setLastPingedAt);
    }
  }, {
    key: "pingServerWithThrottling",
    value: function pingServerWithThrottling() {
      var ms_to_throttle = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

      if (!this.lastPingedAt || this.currentTimestamp() - this.lastPingedAt > ms_to_throttle) {
        this.pingServerNow();
      }
    }

    // Private

  }, {
    key: "setLastPingedAt",
    value: function setLastPingedAt() {
      this.lastPingedAt = this.currentTimestamp();
    }
  }, {
    key: "currentTimestamp",
    value: function currentTimestamp() {
      return Math.floor(new Date().getTime() / 1000);
    }
  }]);

  return ServerPinger;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeoutTimer = (function () {

  // timeoutWarningInSeconds: warning that their session is about to timeout
  //                          when there are this many minutes left.
  // sessionTimeoutInSeconds: tell them their session has timed out when this
  //                          many minutes have elapsed.

  function TimeoutTimer(timeoutWarningInSeconds, sessionTimeoutInSeconds, promptRenderer) {
    _classCallCheck(this, TimeoutTimer);

    this.sessionTimeoutInSeconds = sessionTimeoutInSeconds;
    this.timeoutWarningInSeconds = timeoutWarningInSeconds;
    this.promptRenderer = promptRenderer;
    this.tickInterval = undefined;
    this.timeoutAt = undefined;
    this.currentlyShowingWarningPrompt = false;
    this.recalculateTimeoutAt();
  }

  _createClass(TimeoutTimer, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.tick();
      this.tickInterval = setInterval(function () {
        _this.tick();
      }, 1000);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.tickInterval);
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stop();
      this.recalculateTimeoutAt();
      this.start();
    }

    // Private

  }, {
    key: "tick",
    value: function tick() {
      var timeLeftInSeconds = this.timeoutAt - this.currentTimestamp();
      if (timeLeftInSeconds <= 0) {
        this.showTimedOutPrompt();
      } else if (timeLeftInSeconds <= this.timeoutWarningInSeconds) {
        this.showTimeoutWarningPrompt(timeLeftInSeconds);
      }
    }
  }, {
    key: "showTimedOutPrompt",
    value: function showTimedOutPrompt() {
      this.stop();
      this.promptRenderer.renderTimedOut();
    }
  }, {
    key: "showTimeoutWarningPrompt",
    value: function showTimeoutWarningPrompt(timeLeftInSeconds) {
      if (!this.currentlyShowingWarningPrompt) {
        this.currentlyShowingWarningPrompt = true;
        this.promptRenderer.renderTimeoutWarning(timeLeftInSeconds);
      }
    }

    // We need to use the system time rather than the setTimeout function as it
    // is inherently innacurate.
  }, {
    key: "recalculateTimeoutAt",
    value: function recalculateTimeoutAt() {
      this.timeoutAt = this.currentTimestamp() + this.sessionTimeoutInSeconds;
      //localStorage.setItem(this.sessionKey, this.timeoutAt);
    }
  }, {
    key: "currentTimestamp",
    value: function currentTimestamp() {
      return Math.floor(new Date().getTime() / 1000);
    }
  }]);

  return TimeoutTimer;
})();
