import minify from "minify-kit";
import { matchesGlob, extname } from "node:path";
import { name, version } from "./package.js";
const defaultExtensions = [".html", ".css"];
function globifyExtensions(extensions) {
  extensions = [extensions].flat();
  if (!extensions.length) extensions = defaultExtensions;
  return `**/*${extensions.join(",").replace(/^\.([^,]+,.+)/, ".{$1}").replace(/,\./g, ",")}`;
}
export default function minifyTemplate(options = {
  extensions: defaultExtensions
}) {
  const EXTENSIONS_GLOB = globifyExtensions(options.extensions);
  return {
    name,
    version,
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