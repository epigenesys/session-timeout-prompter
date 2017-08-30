
jQuery(() => {

  const timeoutPrompterContainer = jQuery('#session-timeout-prompter-container');

  // If the container cannot be found then assume we don't need timeout prompting on this page.
  if (timeoutPrompterContainer.length) {
    const configData = timeoutPrompterContainer.data();
    const sessionTimeoutPrompter = new SessionTimeoutPrompter(configData);
    sessionTimeoutPrompter.start();
  }

});


// Ping server when scrolling inside a modal window
// Event only exists if using ajax_modal from epiJs
// jQuery(document).on('ajax-modal-show', () => {
//   jQuery('#modalWindow').scroll( () => {
//     serverPinger.pingServerWithThrottling();
//   });
// });

// TODO: Ability to plug in CKEditor to ping
