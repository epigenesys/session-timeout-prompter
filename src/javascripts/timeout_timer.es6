class TimeoutTimer {

  // timeoutWarningInSeconds: warning that their session is about to timeout
  //                          when there are this many minutes left.
  // sessionTimeoutInSeconds: tell them their session has timed out when this
  //                          many minutes have elapsed.
  constructor(timeoutWarningInSeconds, sessionTimeoutInSeconds, promptRenderer) {
    this.sessionTimeoutInSeconds = sessionTimeoutInSeconds;
    this.timeoutWarningInSeconds = timeoutWarningInSeconds;
    this.promptRenderer          = promptRenderer;
    this.tickInterval = undefined;
    this.timeoutAt    = undefined;
    this.currentlyShowingWarningPrompt = false;
    this.recalculateTimeoutAt();
  }

  start() {
    this.tick();
    this.tickInterval = setInterval( ()=> { this.tick() }, 1000);
  }

  stop() {
    clearInterval(this.tickInterval);
  }

  restart() {
    this.stop();
    this.recalculateTimeoutAt();
    this.start();
  }


  // Private

  tick() {
    var timeLeftInSeconds = this.timeoutAt - this.currentTimestamp();
    if (timeLeftInSeconds <= 0) {
      this.showTimedOutPrompt();
    } else if (timeLeftInSeconds <= this.timeoutWarningInSeconds) {
      this.showTimeoutWarningPrompt(timeLeftInSeconds);
    }
  }

  showTimedOutPrompt() {
    this.stop();
    this.promptRenderer.renderTimedOut();
  }

  showTimeoutWarningPrompt(timeLeftInSeconds) {
    if (!this.currentlyShowingWarningPrompt) {
      this.currentlyShowingWarningPrompt = true;
      this.promptRenderer.renderTimeoutWarning(timeLeftInSeconds);
    }
  }

  // We need to use the system time rather than the setTimeout function as it
  // is inherently innacurate.
  recalculateTimeoutAt() {
    this.timeoutAt = this.currentTimestamp() + this.sessionTimeoutInSeconds;
    //localStorage.setItem(this.sessionKey, this.timeoutAt);
  }

  currentTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
  }

}
