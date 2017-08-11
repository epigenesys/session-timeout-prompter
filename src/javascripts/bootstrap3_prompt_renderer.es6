class Bootstrap3PromptRenderer {

  // timeoutWarningModal:    the jquery object for the Bootstrap3 modal to display
  //                         when the session is about to time out
  // timedOutModal:          the jquery object for the Bootstrap3 modal to display
  //                         when the session has timed out
  // remainingTextContainer: the jquery object for the display of the time remaining
  constructor(timeoutWarningModal, timedOutModal, remainingTextContainer) {
    this.timeoutWarningModal = timeoutWarningModal;
    this.timedOutModal       = timedOutModal;
  }

  renderTimedOut() {
    this.timeoutWarningModal.modal('hide');
    this.timedOutModal.modal('show');
  }

  renderTimeoutWarning(timeLeftInSeconds) {
    const wholeMinutesRemaining      = Math.floor(timeLeftInSeconds / 60);
    const additionalSecondsRemaining = Math.floor(timeLeftInSeconds - (wholeMinutesRemaining * 60));
    this.updateRemainingTimeText(`${wholeMinutesRemaining}m ${additionalSecondsRemaining}s`)
    this.timeoutWarningModal.modal('show');
  }

  hideAll() {
    this.timeoutWarningModal.modal('hide');
    this.timedOutModal.modal('hide');
  }


  // Private
  updateRemainingTimeText(text) {
    this.remainingTextContainer.text(text);
  }

}
