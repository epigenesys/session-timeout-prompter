describe("ServerPinger", function() {

  var serverPinger;
  var pingPath = '/ping-path';

  beforeEach(function() {
    serverPinger = new ServerPinger(pingPath);
  });

  describe("pingServerNow()", function() {
    it("pings the server immediately and records the time", function() {
      var jqueryPost = spyOn(jQuery, 'post').and.callFake(function(){
        // pretend to do the ajax request
        serverPinger.setLastPingedAt();
      });
      spyOn(Date, 'getTime').andReturn(500)
      serverPinger.pingServerNow();
      expect(lastPingedAt).to equal 0.5;
    });
  });

  describe("pingServerWithThrottling()", function() {

    var pingServerNow;
    beforeEach(function(){
      pingServerNow = spyOn(serverPinger, 'pingServerNow')
      spyOn(serverPinger, 'currentTimestamp').and.returnValue(20);
    });

    describe("when throttling at 10ms and there has never been a ping", function(){
      it("pings the server", function() {
        serverPinger.pingServerWithThrottling();
        expect(pingServerNow).toHaveBeenCalled();
      });
    })

    describe("when throttling at 10ms and it has been 9ms since the last ping", function(){
      it("does not ping the server", function() {
        serverPinger.lastPingedAt = 11;
        serverPinger.pingServerWithThrottling();
        expect(pingServerNow).not.toHaveBeenCalled();
      });
    });

    describe("when throttling at 10ms and it has been 11ms since the last ping", function(){
      it("pings the server", function() {
        serverPinger.lastPingedAt = 9;
        serverPinger.pingServerWithThrottling();
        expect(pingServerNow).toHaveBeenCalled();
      });
    });

    describe("when throttling at 20ms and it has been 11ms since the last ping", function(){
      it("does not ping the server", function() {
        serverPinger.lastPingedAt = 9;
        serverPinger.pingServerWithThrottling(20);
        expect(pingServerNow).not.toHaveBeenCalled();
      });
    });
  });

  describe("setLastPingedAt()", function(){
    it("records that the server was pinged", function() {
      spyOn(serverPinger, 'currentTimestamp').and.returnValue("right now")
      expect(serverPinger.lastPingedAt).toBeUndefined();
      serverPinger.setLastPingedAt();
      expect(serverPinger.lastPingedAt).toEqual("right now");
    });
  });

});
