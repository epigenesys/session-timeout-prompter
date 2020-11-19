import Bootstrap4PromptRenderer from '../src/bootstrap4_prompt_renderer';

describe("Bootstrap4PromptRenderer", function() {
  let promptRenderer;
  let timeoutWarningModalMock;
  let timedOutModalMock;
  let remainingTextContainer;

  beforeEach(function() {
    timeoutWarningModalMock    = { modal: jest.fn() }
    timedOutModalMock          = { modal: jest.fn() }
    remainingTextContainer = jQuery('<div>');
    promptRenderer = new Bootstrap4PromptRenderer(timeoutWarningModalMock, timedOutModalMock, remainingTextContainer);
  });

  describe("renderTimedOut", function() {
    it("renders the timed out prompt making sure to hide the warning if present", function() {
      promptRenderer.renderTimedOut();
      expect(timeoutWarningModalMock.modal).toHaveBeenCalledWith('hide');
      expect(timedOutModalMock.modal).toHaveBeenCalledWith('show');
    });
  });

  describe("renderTimeoutWarning", function() {
    describe("when the number of seconds remaining is 63", function() {
      it("updates the remaining time text with 1m 3s", function() {
        promptRenderer.renderTimeoutWarning(63);
        expect(remainingTextContainer.text()).toEqual('1m 3s')
      });
    });

    describe("when the number of seconds remaining is 336", function() {
      it("updates the remaining time text with 5m 36s", function() {
        promptRenderer.renderTimeoutWarning(336);
        expect(remainingTextContainer.text()).toEqual('5m 36s')
      });
    });

    it("renders the timeout warning prompt", function() {
      promptRenderer.renderTimeoutWarning();
      expect(timeoutWarningModalMock.modal).toHaveBeenCalledWith('show');
    });
  });

  describe("hideAll", function() {
    it("renders the timed out prompt making sure to hide the warning if present", function() {
      promptRenderer.hideAll();
      expect(timeoutWarningModalMock.modal).toHaveBeenCalledWith('hide');
      expect(timedOutModalMock.modal).toHaveBeenCalledWith('hide');
    });
  });
});
