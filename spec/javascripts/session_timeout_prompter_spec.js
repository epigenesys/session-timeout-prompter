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

  describe("events", function(){
    var ping;
    beforeEach(function(){
      setFixtures('<div id="some-element"></div>');
      ping = spyOn(sessionTimeoutPrompter.serverPinger, 'pingServerWithThrottling').and.callFake(
        function(){ return true; }
      );
      sessionTimeoutPrompter.bindDefaultEvents();
    });

    describe("when the user performs a mouse click", function(){
      it("pings the server", function(){
        document.getElementById('some-element').click();
        expect(ping).toHaveBeenCalled();
      });
    });
  });

});
