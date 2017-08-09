class ServerPinger {
  constructor(pingPath) {
    this.pingPath     = pingPath;
    this.lastPingedAt = undefined;
  }

  pingServerNow() {
    jQuery.post(this.pingPath, this.setLastPingedAt);
  }

  pingServerWithThrottling(ms_to_throttle = 10) {
    if(!this.lastPingedAt || (this.currentTime() - this.lastPingedAt) > ms_to_throttle) {
      this.pingServerNow();
    }
  }


  // Private

  setLastPingedAt() {
    this.lastPingedAt = this.currentTime();
  }

  currentTime() {
    return Math.floor(new Date().getTime() / 1000);
  }
}
