describe("TimeoutTimer", function() {

  var promptRenderer;
  var timeoutTimer;

  beforeEach(function() {
    jasmine.clock().install();
    jasmine.clock().mockDate();
    promptRenderer = { renderTimedOut: 'foo', renderTimeoutWarning: 'bar' };
    spyOn(promptRenderer, 'renderTimedOut');
    spyOn(promptRenderer, 'renderTimeoutWarning');
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe("Timeout Warning", function(){
    describe("when the timeout is set to 20 seconds and the warning is set to 5 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(5, 20, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 14 seconds have passed", function() {
        it("will not trigger the timeout warning", function() {
          jasmine.clock().tick(14001);
          expect(promptRenderer.renderTimeoutWarning).not.toHaveBeenCalled();
        });
      });

      describe("when 15 seconds have passed", function() {
        it("will trigger the timeout warning with 5 seconds remaining", function() {
          jasmine.clock().tick(15001);
          expect(promptRenderer.renderTimeoutWarning).toHaveBeenCalledWith(5);
        });
      });

      describe("when 18 seconds have passed", function() {
        it("will have only triggered a single warning", function() {
          jasmine.clock().tick(18001);
          expect(promptRenderer.renderTimeoutWarning).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("when the timeout is set to 30 seconds and the warning is set to 10 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(10, 30, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 19 seconds have passed", function() {
        it("will not trigger the timeout warning", function() {
          jasmine.clock().tick(19001);
          expect(promptRenderer.renderTimeoutWarning).not.toHaveBeenCalled();
        });
      });

      describe("when 20 seconds have passed", function() {
        it("will trigger the timeout warning with 10 seconds remaining", function() {
          jasmine.clock().tick(20001);
          expect(promptRenderer.renderTimeoutWarning).toHaveBeenCalledWith(10);
        });
      });
    });
  }); // End describe Timeout Warning



  describe("Timed Out", function(){
    describe("when the timeout is set to 20 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(0, 20, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 19 seconds have passed", function() {
        it("will not trigger the timed out prompt", function() {
          jasmine.clock().tick(19001);
          expect(promptRenderer.renderTimedOut).not.toHaveBeenCalled();
        });
      });

      describe("when 20 seconds have passed", function() {
        it("will trigger the timed out prompt", function() {
          jasmine.clock().tick(20001);
          expect(promptRenderer.renderTimedOut).toHaveBeenCalled();
        });
      });

      describe("when 22 seconds have passed", function() {
        it("will have only triggered a single prompt", function() {
          jasmine.clock().tick(20001);
          expect(promptRenderer.renderTimedOut).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("when the timeout is set to 30 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(0, 30, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 29 seconds have passed", function() {
        it("will not trigger the timed out prompt", function() {
          jasmine.clock().tick(29001);
          expect(promptRenderer.renderTimedOut).not.toHaveBeenCalled();
        });
      });

      describe("when 30 seconds have passed", function() {
        it("will trigger the timed out prompt", function() {
          jasmine.clock().tick(30001);
          expect(promptRenderer.renderTimedOut).toHaveBeenCalled();
        });
      });
    });
  }); // End describe Timeout Warning

});
