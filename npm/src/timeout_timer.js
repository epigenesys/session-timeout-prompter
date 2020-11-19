class TimeoutTimer {

  // secondsToWarnBeforeTimeout: Warning that their session is about to timeout
  //                          when there are this many minutes left.
  // sessionTimeoutInSeconds: Tell them their session has timed out when this
  //                          many minutes have elapsed.
  // sessionKey:              Unique key for this session - used in local storage
  //                          to make sure multiple browser tabs are synched.
  constructor(secondsToWarnBeforeTimeout, sessionTimeoutInSeconds, sessionKey, promptRenderer) {
    this.sessionTimeoutInSeconds = sessionTimeoutInSeconds;
    this.secondsToWarnBeforeTimeout = secondsToWarnBeforeTimeout;
    this.sessionKey              = sessionKey;
    this.promptRenderer          = promptRenderer;
    this.tickInterval = undefined;
    this.timeoutAt    = undefined;
    this.recalculateTimeoutAt();
  }

  start() {
    this.tick();
    this.tickInterval = setInterval( ()=> { this.tick() }, 1000);
  }

  stop() {
    this.promptRenderer.hideAll();
    clearInterval(this.tickInterval);
  }

  restart() {
    this.stop();
    this.recalculateTimeoutAt();
    this.start();
  }

  localStorageUpdated(key, newTimeoutAt) {
    if (key === this.sessionKey) {
      this.stop();
      this.timeoutAt = newTimeoutAt;
      this.start();
    }
  }

  // Private
  tick() {
    const timeLeftInSeconds = this.timeoutAt - this.currentTimestamp();
    if (timeLeftInSeconds <= 0) {
      this.showTimedOutPrompt();
    } else if (timeLeftInSeconds <= this.secondsToWarnBeforeTimeout) {
      this.showTimeoutWarningPrompt(timeLeftInSeconds);
    }
  }

  showTimedOutPrompt() {
    this.stop();
    this.promptRenderer.renderTimedOut();
  }

  showTimeoutWarningPrompt(timeLeftInSeconds) {
    this.promptRenderer.renderTimeoutWarning(timeLeftInSeconds);
  }

  // We need to use the system time rather than the setTimeout function as it
  // is inherently innacurate.
  recalculateTimeoutAt() {
    this.timeoutAt = this.currentTimestamp() + this.sessionTimeoutInSeconds;
    localStorage.setItem(this.sessionKey, this.timeoutAt);
  }

  currentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

export default TimeoutTimer;
