describe("PromptRenderer", function() {

  var promptRenderer;

  beforeEach(function() {
    promptRenderer = new PromptRenderer();
  });

  describe("renderTimedOut", function() {
    it("renders the timed out prompt", function() {
      expect(promptRenderer.renderTimedOut()).toEqual("Your session moos")
    });
  });

});
