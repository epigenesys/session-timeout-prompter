describe("SessionTimeoutPrompter", function() {

  var sessionTimeoutPrompter;

  beforeEach(function() {
    var configData =  {
      serverPingPath:          '/ping-it',
      timeoutWarningInSeconds: 300,
      sessionTimeoutInSeconds: 1000,
      sessionKey:              'some-session-key'
    }
    sessionTimeoutPrompter = new SessionTimeoutPrompter(configData);
  });

  describe("configuration", function(){
    it("sets up the ServerPinger with the correct path", function() {
      expect(sessionTimeoutPrompter.serverPinger.serverPingPath).toEqual('/ping-it');
    });

    it("sets up the TimeoutTimer with the correct timeout values and session key", function() {
      var timeoutTimer = sessionTimeoutPrompter.timeoutTimer;
      expect(timeoutTimer.timeoutWarningInSeconds).toEqual(300);
      expect(timeoutTimer.sessionTimeoutInSeconds).toEqual(1000);
      expect(timeoutTimer.sessionKey).toEqual('some-session-key');
    });
  });

  describe("start", function(){

    it("binds default events and starts the timer", function(){
      var bindEventsSpy = spyOn(sessionTimeoutPrompter, 'bindDefaultEvents');
      var startTimerSpy = spyOn(sessionTimeoutPrompter.timeoutTimer, 'start');

      sessionTimeoutPrompter.start();

      expect(bindEventsSpy).toHaveBeenCalled();
      expect(startTimerSpy).toHaveBeenCalled();
    });

  });

});
