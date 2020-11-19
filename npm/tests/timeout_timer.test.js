import TimeoutTimer from '../src/timeout_timer';

import { advanceTime } from './helpers/time';

describe("TimeoutTimer", function() {
  const baseTime = 1605781640000;
  let promptRenderer;
  let timeoutTimer;
  let sessionKey;

  beforeEach(function() {
    jest.useFakeTimers();
    promptRenderer = { renderTimedOut: jest.fn(), renderTimeoutWarning: jest.fn(), hideAll: function(){} };
    sessionKey     = 'rightKey'
    Date.now = jest.fn(() => baseTime);
  });

  describe("Timeout Warning", function(){
    describe("when the timeout is set to 20 seconds and the warning is set to 5 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(5, 20, sessionKey, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 14 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 14001));

        it("will not trigger the timeout warning", function() {
          expect(promptRenderer.renderTimeoutWarning).not.toHaveBeenCalled();
        });
      });

      describe("when 15 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 15001));

        it("will trigger the timeout warning with 5 seconds remaining", function() {
          expect(promptRenderer.renderTimeoutWarning).toHaveBeenCalledWith(5);
        });
      });
    });

    describe("when the timeout is set to 30 seconds and the warning is set to 10 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(10, 30, sessionKey, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 19 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 19001));

        it("will not trigger the timeout warning", function() {
          expect(promptRenderer.renderTimeoutWarning).not.toHaveBeenCalled();
        });
      });

      describe("when 20 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 20001));

        it("will trigger the timeout warning with 10 seconds remaining", function() {
          jest.advanceTimersByTime(20001);
          expect(promptRenderer.renderTimeoutWarning).toHaveBeenCalledWith(10);
        });
      });
    });
  }); // End describe Timeout Warning


  describe("Timed Out", function(){
    describe("when the timeout is set to 20 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(0, 20, sessionKey, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 19 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 19001));

        it("will not trigger the timed out prompt", function() {
          jest.advanceTimersByTime(19001);
          expect(promptRenderer.renderTimedOut).not.toHaveBeenCalled();
        });
      });

      describe("when 20 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 20001));

        it("will trigger the timed out prompt", function() {
          jest.advanceTimersByTime(20001);
          expect(promptRenderer.renderTimedOut).toHaveBeenCalled();
        });
      });

      describe("when 22 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 22001));

        it("will have only triggered a single prompt", function() {
          expect(promptRenderer.renderTimedOut).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("when the timeout is set to 30 seconds", function() {
      beforeEach(function() {
        timeoutTimer = new TimeoutTimer(0, 30, sessionKey, promptRenderer);
        timeoutTimer.start();
      });

      describe("when 29 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 29001));

        it("will not trigger the timed out prompt", function() {
          expect(promptRenderer.renderTimedOut).not.toHaveBeenCalled();
        });
      });

      describe("when 30 seconds have passed", function() {
        beforeEach(() => advanceTime(baseTime, 30001));

        it("will trigger the timed out prompt", function() {
          expect(promptRenderer.renderTimedOut).toHaveBeenCalled();
        });
      });
    });
  }); // End describe Timeout Warning

  describe("localStorageUpdated", function(){
    beforeEach(function() {
      timeoutTimer = new TimeoutTimer(0, 30, sessionKey, promptRenderer);
      timeoutTimer.start();
    });

    describe("when the given key does not match the session key", function(){
      it("does not update timeoutAt", function(){
        timeoutTimer.sessionKey = 'rightKey';
        timeoutTimer.timeoutAt  = 'oldValue';
        timeoutTimer.localStorageUpdated('wrongKey', 'newValue');
        expect(timeoutTimer.timeoutAt).toEqual('oldValue');
      });
    });

    describe("when the given key matches the session key", function(){
      it("updates timeoutAt to the new value", function(){
        timeoutTimer.sessionKey = 'rightKey';
        timeoutTimer.timeoutAt  = 'oldValue';
        timeoutTimer.localStorageUpdated('rightKey', 'newValue');
        expect(timeoutTimer.timeoutAt).toEqual('newValue');
      });
    });

  });

});
