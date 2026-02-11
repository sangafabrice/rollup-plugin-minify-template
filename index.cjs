"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minifyTemplate;
var _nodePath = require("node:path");
var _package = require("./package.js");
var _minifyKit = _interopRequireDefault(require("minify-kit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultExtensions = [".html", ".css"];
function globifyExtensions(extensions) {
  extensions = [extensions].flat();
  if (!extensions.length) extensions = defaultExtensions;
  return `**/*${extensions.join(",").replace(/^\.([^,]+,.+)/, ".{$1}").replace(/,\./g, ",")}`;
}
function minifyTemplate(options = {
  extensions: defaultExtensions
}) {
  const EXTENSIONS_GLOB = globifyExtensions(options.extensions);
  return {
    name: _package.name,
    version: _package.version,
    transform(code, id) {
      if (!(0, _nodePath.matchesGlob)(id, EXTENSIONS_GLOB)) return null;
      return {
        code: (0, _minifyKit.default)((0, _nodePath.extname)(id), code),
        map: {
          mappings: ""
        }
      };
    }
  };
}
module.exports = exports.default;