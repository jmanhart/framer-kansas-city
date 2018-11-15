require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"example":[function(require,module,exports){
var demoDB, slider;

demoDB = new Firebase({
  projectID: "framer-demo",
  secret: "K2ZJjo4RXG5nlHEWgjgwBzNkeVJCz9YZAQF8dk9g"
});

new BackgroundLayer;

slider = new SliderComponent;

slider.center();

slider.knob.backgroundColor = "grey";

slider.knob.draggable.momentum = false;

slider.knob.onDragEnd(function() {
  return demoDB.put("/sliderValue", slider.value);
});

demoDB.onChange("/sliderValue", function(value) {
  if (!slider.knob.isDragging) {
    return slider.animateToValue(value);
  }
});


},{}],"firebase":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

exports.Firebase = (function(superClass) {
  var parseArgs, request;

  extend(Firebase, superClass);

  Firebase.define("status", {
    get: function() {
      return this._status;
    }
  });

  function Firebase(options1) {
    var base, base1, base2;
    this.options = options1 != null ? options1 : {};
    this.projectID = (base = this.options).projectID != null ? base.projectID : base.projectID = null;
    this.secret = (base1 = this.options).secret != null ? base1.secret : base1.secret = null;
    this.debug = (base2 = this.options).debug != null ? base2.debug : base2.debug = false;
    if (this._status == null) {
      this._status = "disconnected";
    }
    this.secretEndPoint = this.secret ? "?auth=" + this.secret : "?";
    Firebase.__super__.constructor.apply(this, arguments);
    if (this.debug) {
      console.log("Firebase: Connecting to Firebase Project '" + this.projectID + "' ... \n URL: 'https://" + this.projectID + ".firebaseio.com'");
    }
    this.onChange("connection");
  }

  request = function(project, secret, path, callback, method, data, parameters, debug) {
    var options, r, url;
    url = "https://" + project + ".firebaseio.com" + path + ".json" + secret;
    if (parameters != null) {
      if (parameters.shallow) {
        url += "&shallow=true";
      }
      if (parameters.format === "export") {
        url += "&format=export";
      }
      switch (parameters.print) {
        case "pretty":
          url += "&print=pretty";
          break;
        case "silent":
          url += "&print=silent";
      }
      if (typeof parameters.download === "string") {
        url += "&download=" + parameters.download;
        window.open(url, "_self");
      }
      if (typeof parameters.orderBy === "string") {
        url += "&orderBy=" + '"' + parameters.orderBy + '"';
      }
      if (typeof parameters.limitToFirst === "number") {
        url += "&limitToFirst=" + parameters.limitToFirst;
      }
      if (typeof parameters.limitToLast === "number") {
        url += "&limitToLast=" + parameters.limitToLast;
      }
      if (typeof parameters.startAt === "number") {
        url += "&startAt=" + parameters.startAt;
      }
      if (typeof parameters.endAt === "number") {
        url += "&endAt=" + parameters.endAt;
      }
      if (typeof parameters.equalTo === "number") {
        url += "&equalTo=" + parameters.equalTo;
      }
    }
    if (debug) {
      console.log("Firebase: New '" + method + "'-request with data: '" + (JSON.stringify(data)) + "' \n URL: '" + url + "'");
    }
    options = {
      method: method,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    };
    if (data != null) {
      options.body = JSON.stringify(data);
    }
    r = fetch(url, options).then(function(res) {
      var json;
      if (!res.ok) {
        throw Error(res.statusText);
      }
      json = res.json();
      json.then(callback);
      return json;
    })["catch"]((function(_this) {
      return function(error) {
        return console.warn(error);
      };
    })(this));
    return r;
  };

  parseArgs = function() {
    var args, cb, i, l;
    l = arguments[0], args = 3 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []), cb = arguments[i++];
    if (typeof args[l - 1] === "object") {
      args[l] = args[l - 1];
      args[l - 1] = null;
    }
    return cb.apply(null, args);
  };

  Firebase.prototype.get = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return parseArgs.apply(null, [2].concat(slice.call(args), [(function(_this) {
      return function(path, callback, parameters) {
        return request(_this.projectID, _this.secretEndPoint, path, callback, "GET", null, parameters, _this.debug);
      };
    })(this)]));
  };

  Firebase.prototype.put = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return parseArgs.apply(null, [3].concat(slice.call(args), [(function(_this) {
      return function(path, data, callback, parameters) {
        return request(_this.projectID, _this.secretEndPoint, path, callback, "PUT", data, parameters, _this.debug);
      };
    })(this)]));
  };

  Firebase.prototype.post = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return parseArgs.apply(null, [3].concat(slice.call(args), [(function(_this) {
      return function(path, data, callback, parameters) {
        return request(_this.projectID, _this.secretEndPoint, path, callback, "POST", data, parameters, _this.debug);
      };
    })(this)]));
  };

  Firebase.prototype.patch = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return parseArgs.apply(null, [3].concat(slice.call(args), [(function(_this) {
      return function(path, data, callback, parameters) {
        return request(_this.projectID, _this.secretEndPoint, path, callback, "PATCH", data, parameters, _this.debug);
      };
    })(this)]));
  };

  Firebase.prototype["delete"] = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return parseArgs.apply(null, [2].concat(slice.call(args), [(function(_this) {
      return function(path, callback, parameters) {
        return request(_this.projectID, _this.secretEndPoint, path, callback, "DELETE", null, parameters, _this.debug);
      };
    })(this)]));
  };

  Firebase.prototype.onChange = function(path, callback) {
    var currentStatus, source, url;
    if (path === "connection") {
      url = "https://" + this.projectID + ".firebaseio.com/.json" + this.secretEndPoint;
      currentStatus = "disconnected";
      source = new EventSource(url);
      source.addEventListener("open", (function(_this) {
        return function() {
          if (currentStatus === "disconnected") {
            _this._status = "connected";
            if (callback != null) {
              callback("connected");
            }
            if (_this.debug) {
              console.log("Firebase: Connection to Firebase Project '" + _this.projectID + "' established");
            }
          }
          return currentStatus = "connected";
        };
      })(this));
      source.addEventListener("error", (function(_this) {
        return function() {
          if (currentStatus === "connected") {
            _this._status = "disconnected";
            if (callback != null) {
              callback("disconnected");
            }
            if (_this.debug) {
              console.warn("Firebase: Connection to Firebase Project '" + _this.projectID + "' closed");
            }
          }
          return currentStatus = "disconnected";
        };
      })(this));
      return;
    }
    url = "https://" + this.projectID + ".firebaseio.com" + path + ".json" + this.secretEndPoint;
    source = new EventSource(url);
    if (this.debug) {
      console.log("Firebase: Listening to changes made to '" + path + "' \n URL: '" + url + "'");
    }
    source.addEventListener("put", (function(_this) {
      return function(ev) {
        if (callback != null) {
          callback(JSON.parse(ev.data).data, "put", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
        }
        if (_this.debug) {
          return console.log("Firebase: Received changes made to '" + path + "' via 'PUT': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
        }
      };
    })(this));
    return source.addEventListener("patch", (function(_this) {
      return function(ev) {
        if (callback != null) {
          callback(JSON.parse(ev.data).data, "patch", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
        }
        if (_this.debug) {
          return console.log("Firebase: Received changes made to '" + path + "' via 'PATCH': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
        }
      };
    })(this));
  };

  return Firebase;

})(Framer.BaseClass);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbmhhcnQvRG9jdW1lbnRzLzAyX0Rldi9mcmFtZXIta2Fuc2FzLWNpdHkvZnJhbWVyLXN0dWRpby8wMDItZmlyZWJhc2UtSS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYW5oYXJ0L0RvY3VtZW50cy8wMl9EZXYvZnJhbWVyLWthbnNhcy1jaXR5L2ZyYW1lci1zdHVkaW8vMDAyLWZpcmViYXNlLUkuZnJhbWVyL21vZHVsZXMvZmlyZWJhc2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFuaGFydC9Eb2N1bWVudHMvMDJfRGV2L2ZyYW1lci1rYW5zYXMtY2l0eS9mcmFtZXItc3R1ZGlvLzAwMi1maXJlYmFzZS1JLmZyYW1lci9tb2R1bGVzL2V4YW1wbGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyBEb2N1bWVudGF0aW9uIG9mIHRoaXMgTW9kdWxlOiBodHRwczovL2dpdGh1Yi5jb20vbWFyY2tyZW5uL2ZyYW1lci1GaXJlYmFzZVxuIyAtLS0tLS0gOiAtLS0tLS0tIEZpcmViYXNlIFJFU1QgQVBJOiBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9yZWZlcmVuY2UvcmVzdC9kYXRhYmFzZS9cblxuIyBGaXJlYmFzZSBSRVNUIEFQSSBDbGFzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIGV4cG9ydHMuRmlyZWJhc2UgZXh0ZW5kcyBGcmFtZXIuQmFzZUNsYXNzXG5cblxuXHRALmRlZmluZSBcInN0YXR1c1wiLFxuXHRcdGdldDogLT4gQF9zdGF0dXMgIyByZWFkT25seVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QHByb2plY3RJRCA9IEBvcHRpb25zLnByb2plY3RJRCA/PSBudWxsXG5cdFx0QHNlY3JldCAgICA9IEBvcHRpb25zLnNlY3JldCAgICA/PSBudWxsXG5cdFx0QGRlYnVnICAgICA9IEBvcHRpb25zLmRlYnVnICAgICA/PSBmYWxzZVxuXHRcdEBfc3RhdHVzICAgICAgICAgICAgICAgICAgICAgICAgPz0gXCJkaXNjb25uZWN0ZWRcIlxuXG5cdFx0QHNlY3JldEVuZFBvaW50ID0gaWYgQHNlY3JldCB0aGVuIFwiP2F1dGg9I3tAc2VjcmV0fVwiIGVsc2UgXCI/XCIgIyBob3RmaXhcblx0XHRzdXBlclxuXG5cdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogQ29ubmVjdGluZyB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyAuLi4gXFxuIFVSTDogJ2h0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbSdcIiBpZiBAZGVidWdcblx0XHRALm9uQ2hhbmdlIFwiY29ubmVjdGlvblwiXG5cblx0cmVxdWVzdCA9IChwcm9qZWN0LCBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBtZXRob2QsIGRhdGEsIHBhcmFtZXRlcnMsIGRlYnVnKSAtPlxuXG5cdFx0dXJsID0gXCJodHRwczovLyN7cHJvamVjdH0uZmlyZWJhc2Vpby5jb20je3BhdGh9Lmpzb24je3NlY3JldH1cIlxuXG5cdFx0aWYgcGFyYW1ldGVycz9cblx0XHRcdGlmIHBhcmFtZXRlcnMuc2hhbGxvdyAgICAgICAgICAgIHRoZW4gdXJsICs9IFwiJnNoYWxsb3c9dHJ1ZVwiXG5cdFx0XHRpZiBwYXJhbWV0ZXJzLmZvcm1hdCBpcyBcImV4cG9ydFwiIHRoZW4gdXJsICs9IFwiJmZvcm1hdD1leHBvcnRcIlxuXG5cdFx0XHRzd2l0Y2ggcGFyYW1ldGVycy5wcmludFxuXHRcdFx0XHR3aGVuIFwicHJldHR5XCIgdGhlbiB1cmwgKz0gXCImcHJpbnQ9cHJldHR5XCJcblx0XHRcdFx0d2hlbiBcInNpbGVudFwiIHRoZW4gdXJsICs9IFwiJnByaW50PXNpbGVudFwiXG5cblx0XHRcdGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmRvd25sb2FkIGlzIFwic3RyaW5nXCJcblx0XHRcdFx0dXJsICs9IFwiJmRvd25sb2FkPSN7cGFyYW1ldGVycy5kb3dubG9hZH1cIlxuXHRcdFx0XHR3aW5kb3cub3Blbih1cmwsXCJfc2VsZlwiKVxuXG5cdFx0XHR1cmwgKz0gXCImb3JkZXJCeT1cIiArICdcIicgKyBwYXJhbWV0ZXJzLm9yZGVyQnkgKyAnXCInIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLm9yZGVyQnkgICAgICBpcyBcInN0cmluZ1wiXG5cdFx0XHR1cmwgKz0gXCImbGltaXRUb0ZpcnN0PSN7cGFyYW1ldGVycy5saW1pdFRvRmlyc3R9XCIgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5saW1pdFRvRmlyc3QgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmxpbWl0VG9MYXN0PSN7cGFyYW1ldGVycy5saW1pdFRvTGFzdH1cIiAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMubGltaXRUb0xhc3QgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZzdGFydEF0PSN7cGFyYW1ldGVycy5zdGFydEF0fVwiICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLnN0YXJ0QXQgICAgICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImZW5kQXQ9I3twYXJhbWV0ZXJzLmVuZEF0fVwiICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5lbmRBdCAgICAgICAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmVxdWFsVG89I3twYXJhbWV0ZXJzLmVxdWFsVG99XCIgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuZXF1YWxUbyAgICAgIGlzIFwibnVtYmVyXCJcblx0XHRcblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBOZXcgJyN7bWV0aG9kfSctcmVxdWVzdCB3aXRoIGRhdGE6ICcje0pTT04uc3RyaW5naWZ5KGRhdGEpfScgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXHRcdFxuXHRcdG9wdGlvbnMgPVxuXHRcdFx0bWV0aG9kOiBtZXRob2Rcblx0XHRcdGhlYWRlcnM6XG5cdFx0XHRcdCdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcblx0XHRcblx0XHRpZiBkYXRhP1xuXHRcdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcblxuXHRcdHIgPSBmZXRjaCh1cmwsIG9wdGlvbnMpXG5cdFx0LnRoZW4gKHJlcykgLT5cblx0XHRcdGlmICFyZXMub2sgdGhlbiB0aHJvdyBFcnJvcihyZXMuc3RhdHVzVGV4dClcblx0XHRcdGpzb24gPSByZXMuanNvbigpXG5cdFx0XHRqc29uLnRoZW4gY2FsbGJhY2tcblx0XHRcdHJldHVybiBqc29uXG5cdFx0LmNhdGNoIChlcnJvcikgPT4gY29uc29sZS53YXJuKGVycm9yKVxuXHRcdFxuXHRcdHJldHVybiByXG5cblx0IyBUaGlyZCBhcmd1bWVudCBjYW4gYWxzbyBhY2NlcHQgb3B0aW9ucywgcmF0aGVyIHRoYW4gY2FsbGJhY2tcblx0cGFyc2VBcmdzID0gKGwsIGFyZ3MuLi4sIGNiKSAtPlxuXHRcdGlmIHR5cGVvZiBhcmdzW2wtMV0gaXMgXCJvYmplY3RcIlxuXHRcdFx0YXJnc1tsXSA9IGFyZ3NbbC0xXVxuXHRcdFx0YXJnc1tsLTFdID0gbnVsbFxuXG5cdFx0cmV0dXJuIGNiLmFwcGx5KG51bGwsIGFyZ3MpXG5cblx0IyBBdmFpbGFibGUgbWV0aG9kc1xuXG5cdGdldDogICAgKGFyZ3MuLi4pIC0+IHBhcnNlQXJncyAyLCBhcmdzLi4uLCAocGF0aCwgXHRcdCBjYWxsYmFjaywgcGFyYW1ldGVycykgPT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIkdFVFwiLCAgICBudWxsLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHB1dDogICAgKGFyZ3MuLi4pIC0+IHBhcnNlQXJncyAzLCBhcmdzLi4uLCAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpID0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJQVVRcIiwgICAgZGF0YSwgcGFyYW1ldGVycywgQGRlYnVnKVxuXHRwb3N0OiAgIChhcmdzLi4uKSAtPiBwYXJzZUFyZ3MgMywgYXJncy4uLiwgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSA9PiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiUE9TVFwiLCAgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cGF0Y2g6ICAoYXJncy4uLikgLT4gcGFyc2VBcmdzIDMsIGFyZ3MuLi4sIChwYXRoLCBkYXRhLCBjYWxsYmFjaywgcGFyYW1ldGVycykgPT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIlBBVENIXCIsICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdGRlbGV0ZTogKGFyZ3MuLi4pIC0+IHBhcnNlQXJncyAyLCBhcmdzLi4uLCAocGF0aCwgXHQgIFx0IGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSA9PiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiREVMRVRFXCIsIG51bGwsIHBhcmFtZXRlcnMsIEBkZWJ1ZylcblxuXG5cdG9uQ2hhbmdlOiAocGF0aCwgY2FsbGJhY2spIC0+XG5cblxuXHRcdGlmIHBhdGggaXMgXCJjb25uZWN0aW9uXCJcblxuXHRcdFx0dXJsID0gXCJodHRwczovLyN7QHByb2plY3RJRH0uZmlyZWJhc2Vpby5jb20vLmpzb24je0BzZWNyZXRFbmRQb2ludH1cIlxuXHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwib3BlblwiLCA9PlxuXHRcdFx0XHRpZiBjdXJyZW50U3RhdHVzIGlzIFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdFx0XHRALl9zdGF0dXMgPSBcImNvbm5lY3RlZFwiXG5cdFx0XHRcdFx0Y2FsbGJhY2soXCJjb25uZWN0ZWRcIikgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogQ29ubmVjdGlvbiB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyBlc3RhYmxpc2hlZFwiIGlmIEBkZWJ1Z1xuXHRcdFx0XHRjdXJyZW50U3RhdHVzID0gXCJjb25uZWN0ZWRcIlxuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcImVycm9yXCIsID0+XG5cdFx0XHRcdGlmIGN1cnJlbnRTdGF0dXMgaXMgXCJjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdEAuX3N0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdFx0XHRjYWxsYmFjayhcImRpc2Nvbm5lY3RlZFwiKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLndhcm4gXCJGaXJlYmFzZTogQ29ubmVjdGlvbiB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyBjbG9zZWRcIiBpZiBAZGVidWdcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblxuXHRcdFx0cmV0dXJuXG5cblx0XHR1cmwgPSBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbSN7cGF0aH0uanNvbiN7QHNlY3JldEVuZFBvaW50fVwiXG5cdFx0c291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBMaXN0ZW5pbmcgdG8gY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuXG5cdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJwdXRcIiwgKGV2KSA9PlxuXHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInB1dFwiLCBKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGgsIF8udGFpbChKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGguc3BsaXQoXCIvXCIpLDEpKSBpZiBjYWxsYmFjaz9cblx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlY2VpdmVkIGNoYW5nZXMgbWFkZSB0byAnI3twYXRofScgdmlhICdQVVQnOiAje0pTT04ucGFyc2UoZXYuZGF0YSkuZGF0YX0gXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWdcblxuXHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwicGF0Y2hcIiwgKGV2KSA9PlxuXHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInBhdGNoXCIsIEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aCwgXy50YWlsKEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aC5zcGxpdChcIi9cIiksMSkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVjZWl2ZWQgY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyB2aWEgJ1BBVENIJzogI3tKU09OLnBhcnNlKGV2LmRhdGEpLmRhdGF9IFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG4iLCJcblxuIyBQbGVhc2UgZGVhY3RpdmF0ZSBBdXRvIFJlZnJlc2ggYW5kIHJlbG9hZCBtYW51YWxseSB1c2luZyBDTUQrUiFcblxuXG4jIFRoZSByZXF1aXJlZCBpbmZvcm1hdGlvbiBpcyBsb2NhdGVkIGF0IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbSDihpIgQ29uc29sZSDihpIgWW91clByb2plY3Qg4oaSIC4uLlxuZGVtb0RCID0gbmV3IEZpcmViYXNlXG5cdHByb2plY3RJRDogXCJmcmFtZXItZGVtb1wiICMgLi4uIERhdGFiYXNlIOKGkiBmaXJzdCBwYXJ0IG9mIFVSTFxuXHRzZWNyZXQ6IFwiSzJaSmpvNFJYRzVubEhFV2dqZ3dCek5rZVZKQ3o5WVpBUUY4ZGs5Z1wiICMgLi4uIFByb2plY3QgU2V0dGluZ3Mg4oaSIFNlcnZpY2UgQWNjb3VudHMg4oaSIERhdGFiYXNlIFNlY3JldHMg4oaSIFNob3cgKG1vdXNlLW92ZXIpXG5cblxuXG4jIExheWVyc1xuXG5uZXcgQmFja2dyb3VuZExheWVyXG5cbnNsaWRlciA9IG5ldyBTbGlkZXJDb21wb25lbnRcbnNsaWRlci5jZW50ZXIoKVxuXG5zbGlkZXIua25vYi5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIlxuc2xpZGVyLmtub2IuZHJhZ2dhYmxlLm1vbWVudHVtID0gZmFsc2VcblxuXG5cbiMgRXZlbnRzICsgRmlyZWJhc2Vcblxuc2xpZGVyLmtub2Iub25EcmFnRW5kIC0+XG5cdGRlbW9EQi5wdXQoXCIvc2xpZGVyVmFsdWVcIixzbGlkZXIudmFsdWUpICMgYHB1dMK0IHdyaXRlcyBkYXRhIHRvIEZpcmViYXNlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAjIHNlZSBodHRwOi8vYml0Lmx5L2ZpcmViYXNlUHV0XG5cbmRlbW9EQi5vbkNoYW5nZSBcIi9zbGlkZXJWYWx1ZVwiLCAodmFsdWUpIC0+ICMgUmV0cmVpdmVzIGRhdGEgb25Mb2FkIGFuZCB3aGVuIGl0IHdhcyBjaGFuZ2VkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0IyBzZWUgaHR0cDovL2JpdC5seS9maXJlYmFzZU9uQ2hhbmdlXG5cdHNsaWRlci5hbmltYXRlVG9WYWx1ZSh2YWx1ZSkgdW5sZXNzIHNsaWRlci5rbm9iLmlzRHJhZ2dpbmdcblxuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUdBQTtBRE1BLElBQUE7O0FBQUEsTUFBQSxHQUFhLElBQUEsUUFBQSxDQUNaO0VBQUEsU0FBQSxFQUFXLGFBQVg7RUFDQSxNQUFBLEVBQVEsMENBRFI7Q0FEWTs7QUFRYixJQUFJOztBQUVKLE1BQUEsR0FBUyxJQUFJOztBQUNiLE1BQU0sQ0FBQyxNQUFQLENBQUE7O0FBRUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFaLEdBQThCOztBQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUF0QixHQUFpQzs7QUFNakMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFaLENBQXNCLFNBQUE7U0FDckIsTUFBTSxD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
