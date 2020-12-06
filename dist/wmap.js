/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/wmap.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wmap_wmap = /*#__PURE__*/function () {
  function wmap() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      plugins: []
    };

    _classCallCheck(this, wmap);

    options.plugins.forEach(function (plugin) {
      _this.register(plugin);
    });
  }

  _createClass(wmap, [{
    key: "scan",
    value: function scan() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      console.log("Boom scan");
      return ["192.168.0.12", "192.168.0.15"];
    }
  }, {
    key: "register",
    value: function register(plugin) {
      var _this2 = this;

      if (["name", "type", "exec"].every(function (key) {
        return key in plugin;
      })) throw new Error("Invalid plugin. See the doc!");

      switch (plugin.type) {
        case "function":
          if (this[plugin.name]) throw new Error("There's a function with that name.");
          this[plugin.name] = plugin.exec;
          break;

        case "preFunction":
          if (!this[plugin.name]) throw new Error("There's no function with that name.");
          var oldFunction = this[plugin.name];

          this[plugin.name] = function (options) {
            plugin.exec(options);
            var result = oldFunction.apply(_this2, options);
            return result;
          };

          break;

        case "postFunction":
          if (!this[plugin.name]) throw new Error("There's no function with that name.");
          var oldFunction = this[plugin.name];

          this[plugin.name] = function (options) {
            var result = oldFunction.apply(_this2, options);
            plugin.exec(result);
            return result;
          };

          break;

        default:
          throw new Error("Plugin type not recognized. See the doc!");
          break;
      }
    }
  }]);

  return wmap;
}();


;// CONCATENATED MODULE: ./app.js

window.wmap = wmap_wmap;
window.wmapTest = new wmap_wmap({
  plugins: [{
    name: "portscan",
    type: "function",
    exec: function exec(options) {
      console.log("OUYOU PORT SCAN");
    }
  }]
});
/* harmony default export */ const app = ((/* unused pure expression or super */ null && (wmap)));
/******/ })()
;