describe("ServerPinger", function() {

  var serverPinger;
  var pingPath = '/ping-path';

  beforeEach(function() {
    serverPinger = new ServerPinger(pingPath);
  });

  describe("pingServerNow()", function(){

    beforeEach(function() {
      jasmine.Ajax.install();
      serverPinger = new ServerPinger(pingPath);

      jasmine.Ajax.stubRequest(pingPath).andReturn({
        status: 200
      });

    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });


    it("pings the server immediately", function() {
      var ajaxSpy = spyOn($, 'post');
      serverPinger.pingServerNow();
      expect(ajaxSpy).toHaveBeenCalledWith(pingPath, any(Function));
    });

    it("records that the server was pinged", function(){
      expect(serverPinger.lastPinged).toBeUndefined();
      serverPinger.pingServerNow();
      spyOn(serverPinger, "currentTime").andReturn("a minute ago");
      expect(serverPinger.lastPinged).toEqual("a minute ago");
    });

  });

});
