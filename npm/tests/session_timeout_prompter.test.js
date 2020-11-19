import SessionTimeoutPrompter from '../src/session_timeout_prompter';

describe("SessionTimeoutPrompter", function() {
  let sessionTimeoutPrompter;

  beforeEach(function() {
    const configData =  {
      serverPingPath:          '/ping-it',
      secondsToWarnBeforeTimeout: 300,
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
      const timeoutTimer = sessionTimeoutPrompter.timeoutTimer;
      expect(timeoutTimer.secondsToWarnBeforeTimeout).toEqual(300);
      expect(timeoutTimer.sessionTimeoutInSeconds).toEqual(1000);
      expect(timeoutTimer.sessionKey).toEqual('some-session-key');
    });
  });

  describe("start", function(){
    it("binds default events and starts the timer", function(){
      sessionTimeoutPrompter.bindDefaultEvents = jest.fn();
      sessionTimeoutPrompter.timeoutTimer.start = jest.fn();

      sessionTimeoutPrompter.start();

      expect(sessionTimeoutPrompter.bindDefaultEvents).toHaveBeenCalled();
      expect(sessionTimeoutPrompter.timeoutTimer.start).toHaveBeenCalled();
    });

  });
});
