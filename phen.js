/*!
 * (c) 2015 Towry Wang
 * Released under MIT License
 *
 * Browser side Promise implemented.
 */

!function (global) {

  global.phen = {
    defer: function (fn) {
      if (!fn || typeof fn !== 'function') {
        throw new Error("Expecting a function as argument");
      }

      return new Promise(fn);
    }
  }

  /*
   * A promise object has three states: pending, fulfilled, rejected
   */
  function Promise (fn) {
    var pending = [], value, state = 'pending', self = this;

    var proto = Promise.prototype;

    proto.then = function (onFulfilled, onRejected) {
      onFulfilled = onFulfilled || function (v) {
        return v;
      }

      onRejected = onRejected || function (e) {
        return e;
      }

      return new Promise(function (resolve, reject) {
        var _onFulfilled = function (v) {
          resolve(onFulfilled(v));
        }
        var _onReject = function (e) {
          resolve(onRejected(e));
        }

        if (state !== 'pending') {
          _onFulfilled(value);
        } 

        else {
          pending.push([_onFulfilled, _onReject]);
        }
      });
    }

    setTimeout(function () {
      fn(function (v) {
        // resolve it, after resolve, the promise is fulfilled
        value = v;

        if (pending) {
          for (var i = 0, ii = pending.length; i < ii; i++) {
            var cb = pending[i][0];
            cb(v);
          }
          pending = null;
        }

        state = 'fulfilled';
      }, function (e) {
        // reject it, after reject, the promise is rejected
        value = e;

        if (pending) {
          for (var i = 0, ii = pending.length; i < ii; i++) {
            var cb = pending[i][1];
            cb(e);
          }
          pending = null;
        }

        state = 'rejected';
      });
    }, 1);

  }

}(window);

