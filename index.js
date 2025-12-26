import minify from "minify-kit";
// $FlowFixMe[cannot-resolve-module]
import { matchesGlob, extname } from "node:path";
import { name, version } from "./package.js";
const defaultExtensions = [".html", ".css"];
function globifyExtensions(extensions) {
  extensions = [extensions].flat();
  if (!extensions.length) extensions = defaultExtensions;
  return `**/*${extensions.join(",").replace(/^\.([^,]+,.+)/, ".{$1}").replace(/,\./g, ",")}`;
}

/**
 * Creates a Rollup plugin that minifies imported source files
 * during the build process.
 * @param options - The plugin configuration options.
 * @param options.extensions - The extensions of source files to minify.
 * @returns The Rollup plugin object.
 */
export default function minifyTemplate(options = {
  extensions: defaultExtensions
}) {
  const EXTENSIONS_GLOB = globifyExtensions(options.extensions);
  return {
    name,
    version,
    /** Minifies source files. */
    transform(code, id) {
      if (!matchesGlob(id, EXTENSIONS_GLOB)) return null;
      return {
        code: minify(extname(id), code),
        map: {
          mappings: ""
        }
      };
    }
  };
}