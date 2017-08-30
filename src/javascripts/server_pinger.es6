class ServerPinger {
  constructor(serverPingPath) {
    this.serverPingPath = serverPingPath;
    this.lastPingedAt   = undefined;
  }

  pingServerNow() {
    const callback = ()=> { this.setLastPingedAt() }
    jQuery.post(this.serverPingPath, callback);
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
