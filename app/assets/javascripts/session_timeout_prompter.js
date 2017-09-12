'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Bootstrap3PromptRenderer = (function () {

  // timeoutWarningModal:    the jquery object for the Bootstrap3 modal to display
  //                         when the session is about to time out
  // timedOutModal:          the jquery object for the Bootstrap3 modal to display
  //                         when the session has timed out
  // remainingTextContainer: the jquery object for the display of the time remaining

  function Bootstrap3PromptRenderer(timeoutWarningModal, timedOutModal, remainingTextContainer) {
    _classCallCheck(this, Bootstrap3PromptRenderer);

    this.timeoutWarningModal = timeoutWarningModal;
    this.timedOutModal = timedOutModal;
    this.remainingTextContainer = remainingTextContainer;
    this.currentlyShowingWarningPrompt = false;
  }

  _createClass(Bootstrap3PromptRenderer, [{
    key: 'renderTimedOut',
    value: function renderTimedOut() {
      this.timeoutWarningModal.modal('hide');
      this.timedOutModal.modal('show');
    }
  }, {
    key: 'renderTimeoutWarning',
    value: function renderTimeoutWarning(timeLeftInSeconds) {
      this.updateRemainingTimeText(timeLeftInSeconds);
      if (!this.currentlyShowingWarningPrompt) {
        this.currentlyShowingWarningPrompt = true;
        this.timeoutWarningModal.modal('show');
      }
    }
  }, {
    key: 'hideAll',
    value: function hideAll() {
      this.timeoutWarningModal.modal('hide');
      this.timedOutModal.modal('hide');
      this.currentlyShowingWarningPrompt = false;
    }
  }, {
    key: 'updateRemainingTimeText',
    value: function updateRemainingTimeText(timeLeftInSeconds) {
      var wholeMinutesRemaining = Math.floor(timeLeftInSeconds / 60);
      var additionalSecondsRemaining = Math.floor(timeLeftInSeconds - wholeMinutesRemaining * 60);
      this.remainingTextContainer.text(wholeMinutesRemaining + 'm ' + additionalSecondsRemaining + 's');
    }
  }]);

  return Bootstrap3PromptRenderer;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerPinger = (function () {
  function ServerPinger(serverPingPath) {
    _classCallCheck(this, ServerPinger);

    this.serverPingPath = serverPingPath;
    this.lastPingedAt = undefined;
  }

  _createClass(ServerPinger, [{
    key: "pingServerNow",
    value: function pingServerNow() {
      var _this = this;

      var callback = function callback() {
        _this.setLastPingedAt();
      };
      jQuery.post(this.serverPingPath, callback);
    }
  }, {
    key: "pingServerWithThrottling",
    value: function pingServerWithThrottling() {
      var seconds_to_throttle = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

      if (!this.lastPingedAt || this.currentTimestamp() - this.lastPingedAt > seconds_to_throttle) {
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
'use strict';

var sessionTimeoutPrompter = undefined;
jQuery(function () {

  var timeoutPrompterContainer = jQuery('#session-timeout-prompter-container');

  // If the container cannot be found then assume we don't need timeout prompting on this page.
  if (timeoutPrompterContainer.length) {
    var configData = timeoutPrompterContainer.data();
    sessionTimeoutPrompter = new SessionTimeoutPrompter(configData);
    sessionTimeoutPrompter.start();
  }
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SessionTimeoutPrompter = (function () {
  function SessionTimeoutPrompter(configData) {
    _classCallCheck(this, SessionTimeoutPrompter);

    var serverPingPath = configData.serverPingPath;
    var secondsToWarnBeforeTimeout = configData.secondsToWarnBeforeTimeout;
    var sessionTimeoutInSeconds = configData.sessionTimeoutInSeconds;
    var sessionKey = configData.sessionKey;

    var timeoutWarningModal = jQuery('#session-timeout-prompter-timeout-warning-modal');
    var timedOutModal = jQuery('#session-timeout-prompter-session-timed-out-modal');
    var remainingTimeContainer = jQuery('#session-timeout-prompter-warning-timeout-in');

    var promptRenderer = new Bootstrap3PromptRenderer(timeoutWarningModal, timedOutModal, remainingTimeContainer);

    this.timeoutTimer = new TimeoutTimer(secondsToWarnBeforeTimeout, sessionTimeoutInSeconds, sessionKey, promptRenderer);
    this.serverPinger = new ServerPinger(serverPingPath);
    this.remainLoggedInButton = jQuery('#session-timeout-prompter-remain-logged-in-btn');
  }

  _createClass(SessionTimeoutPrompter, [{
    key: 'start',
    value: function start() {
      this.bindDefaultEvents();
      this.timeoutTimer.start();
    }

    // Private

  }, {
    key: 'bindDefaultEvents',
    value: function bindDefaultEvents() {
      var _this = this;

      // Restart the timer: This is triggered by any jquery ajax request completing,
      // including pinging the server via our other events.
      jQuery(document).ajaxComplete(function () {
        _this.timeoutTimer.restart();
      });

      // When the user clicks the button to say they want to remain logged in we
      // stop the timer to wait until it is restarted via via the ajaxComplete()
      // event triggered by the ping
      this.remainLoggedInButton.on('click', function () {
        _this.serverPinger.pingServerNow();
        _this.timeoutTimer.stop();
      });

      // Listen to the storage event fired in TimeoutTimer to synchronise browser tabs
      // if a user extends their session in one tab but has another open for example.
      jQuery(window).on('storage', function (e) {
        var event = e.originalEvent;
        _this.timeoutTimer.localStorageUpdated(event.key, event.newValue);
      });
    }
  }]);

  return SessionTimeoutPrompter;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeoutTimer = (function () {

  // secondsToWarnBeforeTimeout: Warning that their session is about to timeout
  //                          when there are this many minutes left.
  // sessionTimeoutInSeconds: Tell them their session has timed out when this
  //                          many minutes have elapsed.
  // sessionKey:              Unique key for this session - used in local storage
  //                          to make sure multiple browser tabs are synched.

  function TimeoutTimer(secondsToWarnBeforeTimeout, sessionTimeoutInSeconds, sessionKey, promptRenderer) {
    _classCallCheck(this, TimeoutTimer);

    this.sessionTimeoutInSeconds = sessionTimeoutInSeconds;
    this.secondsToWarnBeforeTimeout = secondsToWarnBeforeTimeout;
    this.sessionKey = sessionKey;
    this.promptRenderer = promptRenderer;
    this.tickInterval = undefined;
    this.timeoutAt = undefined;
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
      this.promptRenderer.hideAll();
      clearInterval(this.tickInterval);
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stop();
      this.recalculateTimeoutAt();
      this.start();
    }
  }, {
    key: "localStorageUpdated",
    value: function localStorageUpdated(key, newTimeoutAt) {
      if (key === this.sessionKey) {
        this.stop();
        this.timeoutAt = newTimeoutAt;
        this.start();
      }
    }

    // Private
  }, {
    key: "tick",
    value: function tick() {
      var timeLeftInSeconds = this.timeoutAt - this.currentTimestamp();
      if (timeLeftInSeconds <= 0) {
        this.showTimedOutPrompt();
      } else if (timeLeftInSeconds <= this.secondsToWarnBeforeTimeout) {
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
      this.promptRenderer.renderTimeoutWarning(timeLeftInSeconds);
    }

    // We need to use the system time rather than the setTimeout function as it
    // is inherently innacurate.
  }, {
    key: "recalculateTimeoutAt",
    value: function recalculateTimeoutAt() {
      this.timeoutAt = this.currentTimestamp() + this.sessionTimeoutInSeconds;
      localStorage.setItem(this.sessionKey, this.timeoutAt);
    }
  }, {
    key: "currentTimestamp",
    value: function currentTimestamp() {
      return Math.floor(new Date().getTime() / 1000);
    }
  }]);

  return TimeoutTimer;
})();
