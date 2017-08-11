class ServerPinger {
  constructor(serverPingPath) {
    this.serverPingPath = serverPingPath;
    this.lastPingedAt   = undefined;
  }

  pingServerNow() {
    jQuery.post(this.serverPingPath, this.setLastPingedAt);
  }

  pingServerWithThrottling(ms_to_throttle = 10) {
    if(!this.lastPingedAt || (this.currentTimestamp() - this.lastPingedAt) > ms_to_throttle) {
      this.pingServerNow();
    }
  }


  // Private
  setLastPingedAt() {
    this.lastPingedAt = this.currentTimestamp();
  }

  currentTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
  }
}
