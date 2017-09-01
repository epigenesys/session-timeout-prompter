describe("Bootstrap3PromptRenderer", function() {

  var promptRenderer;
  var timeoutWarningModal;
  var timedOutModal;
  var remainingTextContainer;

  beforeEach(function() {
    timeoutWarningModal    = { modal: function(action) { } }
    timedOutModal          = { modal: function(action) { } }
    remainingTextContainer = { text: "" }
    promptRenderer = new Bootstrap3PromptRenderer(timeoutWarningModal, timedOutModal, remainingTextContainer);
  });

  describe("renderTimedOut", function() {
    it("renders the timed out prompt making sure to hide the warning if present", function() {
      timeoutWarningSpy = spyOn(timeoutWarningModal, 'modal');
      timedOutSpy       = spyOn(timedOutModal, 'modal');
      promptRenderer.renderTimedOut();
      expect(timeoutWarningSpy).toHaveBeenCalledWith('hide');
      expect(timedOutSpy).toHaveBeenCalledWith('show');
    });
  });

  describe("renderTimeoutWarning", function() {
    var timeoutWarningSpy;

    beforeEach(function() {
      timeoutWarningSpy = spyOn(timeoutWarningModal, 'modal');
    });


    describe("when the number of seconds remaining is 63", function() {
      it("updates the remaining time text with 1m 3s", function() {
        promptRenderer.renderTimeoutWarning(63);
        expect(remainingTextContainer.text).toEqual('1m 3s')
      });
    });

    describe("when the number of seconds remaining is 336", function() {
      it("updates the remaining time text with 5m 36s", function() {
        promptRenderer.renderTimeoutWarning(336);
        expect(remainingTextContainer.text).toEqual('5m 36s')
      });
    });

    it("renders the timeout warning prompt", function() {
      promptRenderer.renderTimeoutWarning();
      expect(timeoutWarningSpy).toHaveBeenCalledWith('show');
    });

    // describe("when 18 seconds have passed", function() {
    //   it("will have only triggered a single warning", function() {
    //     jasmine.clock().tick(18001);
    //     expect(promptRenderer.renderTimeoutWarning).toHaveBeenCalledTimes(1);
    //   });
    // });
  });

  describe("hideAll", function() {
    it("renders the timed out prompt making sure to hide the warning if present", function() {
      timeoutWarningSpy = spyOn(timeoutWarningModal, 'modal');
      timedOutSpy       = spyOn(timedOutModal, 'modal');
      promptRenderer.hideAll();
      expect(timeoutWarningSpy).toHaveBeenCalledWith('hide');
      expect(timedOutSpy).toHaveBeenCalledWith('hide');
    });
  });

});
