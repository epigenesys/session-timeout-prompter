let sessionTimeoutPrompter = undefined;

jQuery(() => {
  const timeoutPrompterContainer = jQuery('#session-timeout-prompter-container');

  // If the container cannot be found then assume we don't need timeout prompting on this page.
  if (timeoutPrompterContainer.length) {
    const configData = timeoutPrompterContainer.data();
    sessionTimeoutPrompter = new SessionTimeoutPrompter(configData);
    sessionTimeoutPrompter.start();
  }
});
