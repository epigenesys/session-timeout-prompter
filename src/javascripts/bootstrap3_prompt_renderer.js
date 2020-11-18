class Bootstrap3PromptRenderer {

  // timeoutWarningModal:    the jquery object for the Bootstrap3 modal to display
  //                         when the session is about to time out
  // timedOutModal:          the jquery object for the Bootstrap3 modal to display
  //                         when the session has timed out
  // remainingTextContainer: the jquery object for the display of the time remaining
  constructor(timeoutWarningModal, timedOutModal, remainingTextContainer) {
    this.timeoutWarningModal    = timeoutWarningModal;
    this.timedOutModal          = timedOutModal;
    this.remainingTextContainer = remainingTextContainer;
    this.currentlyShowingWarningPrompt = false;
  }

  renderTimedOut() {
    this.timeoutWarningModal.modal('hide');
    this.timedOutModal.modal('show');
  }

  renderTimeoutWarning(timeLeftInSeconds) {
    this.updateRemainingTimeText(timeLeftInSeconds);
    if (!this.currentlyShowingWarningPrompt) {
      this.currentlyShowingWarningPrompt = true;
      this.timeoutWarningModal.modal('show');
    }
  }

  hideAll() {
    this.timeoutWarningModal.modal('hide');
    this.timedOutModal.modal('hide');
    this.currentlyShowingWarningPrompt = false;
  }

  updateRemainingTimeText(timeLeftInSeconds) {
    const wholeMinutesRemaining      = Math.floor(timeLeftInSeconds / 60);
    const additionalSecondsRemaining = Math.floor(timeLeftInSeconds - (wholeMinutesRemaining * 60));
    this.remainingTextContainer.text(`${wholeMinutesRemaining}m ${additionalSecondsRemaining}s`);
  }

}
