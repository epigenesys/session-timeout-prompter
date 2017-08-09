'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function ($) {
  // Prompt when 5 minutes remaining before timeout
  var LATENCY_ADJUSTMENT = 5;
  var PROMPT_WHEN_X_SECONDS_LEFT = 300 + LATENCY_ADJUSTMENT;

  var SessionTimeoutChecker = (function () {
    function SessionTimeoutChecker(element) {
      _classCallCheck(this, SessionTimeoutChecker);

      this.tick = this.tick.bind(this);
      this.sessionKey = element.data('session-key');

      this.sessionTimeoutInSeconds = parseInt(element.data('timeout-in'));
      this.serverPinger = new ServerPinger(element.data('server-ping-path'));

      this.aboutToTimeoutPrompt = $('#session-timeout-prompter-about-to-timeout');
      this.timedOutPrompt = $('#session-timeout-prompter-session-timed-out');

      this.promptingSessionTimeout = false;

      this.setTimeoutAt();
      this.addListeners();
    }

    _createClass(SessionTimeoutChecker, [{
      key: 'addListeners',
      value: function addListeners() {
        var _this = this;

        this.aboutToTimeoutPrompt.on('click', '#session-timeout-prompter-remain-logged-in-btn', function () {
          _this.promptingSessionTimeout = false;
          _this.aboutToTimeoutPrompt.modal('hide');
          _this.stop();
          return _this.pingServerNow();
        });

        return $(window).on('storage', function (e) {
          var event = e.originalEvent;
          if (event.key === _this.sessionKey) {
            _this.hideAllPrompts();
            _this.stop();
            _this.timeoutAt = event.newValue;
            return _this.start();
          }
        });
      }
    }, {
      key: 'showAboutToTimeoutPrompt',
      value: function showAboutToTimeoutPrompt(timeLeftInSeconds) {
        if (!this.promptingSessionTimeout) {
          this.promptingSessionTimeout = true;
          this.aboutToTimeoutPrompt.modal('show');
        }

        var minutesForDisplay = Math.floor(timeLeftInSeconds / 60);
        var secondsForDisplay = Math.floor(timeLeftInSeconds - minutesForDisplay * 60);

        return $('#session-timeout-prompter-about-to-timeout-in', this.aboutToTimeoutPrompt).text(minutesForDisplay + 'm ' + secondsForDisplay + 's');
      }
    }, {
      key: 'showTimeoutPrompt',
      value: function showTimeoutPrompt() {
        this.aboutToTimeoutPrompt.modal('hide');
        this.timedOutPrompt.modal('show');
        return this.stop();
      }
    }, {
      key: 'hideAllPrompts',
      value: function hideAllPrompts() {
        this.promptingSessionTimeout = false;
        this.aboutToTimeoutPrompt.modal('hide');
        return this.timedOutPrompt.modal('hide');
      }
    }, {
      key: 'pingServerNow',
      value: function pingServerNow() {
        this.serverPinger.pingServerNow();
      }
    }, {
      key: 'pingServerWithThrottling',
      value: function pingServerWithThrottling() {
        if (!this.promptingSessionTimeout) {
          this.serverPinger.pingServerNow();
        }
      }
    }]);

    return SessionTimeoutChecker;
  })();

  $.fn.sessionTimoutChecker = function (action) {
    return this.each(function () {
      var timeoutChecker = $(this).data('session-timeout-checker');
      if (timeoutChecker == null) {
        $(this).data('session-timeout-checker', timeoutChecker = new SessionTimeoutChecker($(this)));
      }

      return timeoutChecker[action]();
    });
  };

  return $(function () {
    if ($('#session-timeout-prompter-container').is('[data-timeout-in]')) {
      var _ret = (function () {
        $('#session-timeout-prompter-container').sessionTimoutChecker('start');
        $(document).ajaxComplete(function () {
          return $('#session-timeout-prompter-container').sessionTimoutChecker('restart');
        });

        var pingServer = function pingServer() {
          return $('#session-timeout-prompter-container').sessionTimoutChecker('pingServerWithInterval');
        };

        $(window).scroll(pingServer);
        $(document).on('keydown click', pingServer);
        return {
          v: $(document).on('ajax-modal-show', function () {
            return $('#modalWindow').scroll(pingServer);
          })
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  });
})(jQuery);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromptRenderer = (function () {
  function PromptRenderer() {
    _classCallCheck(this, PromptRenderer);
  }

  _createClass(PromptRenderer, [{
    key: "renderTimedOut",
    value: function renderTimedOut() {
      return "Your session moos";
    }
  }]);

  return PromptRenderer;
})();
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
