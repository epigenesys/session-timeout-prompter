class ServerPinger {
  constructor(pingPath) {
    this.pingPath   = pingPath;
    this.lastPinged = undefined;
  }

  pingServerNow() {
    $.post(this.pingPath, () => {
      this.lastPinged = this.currentTime();
    });
  }

  currentTime() {
    return Math.floor(new Date().getTime() / 1000);
  }
}
