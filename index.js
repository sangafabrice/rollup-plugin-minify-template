/** @flow */
// $FlowFixMe[cannot-resolve-module]
import { extname, matchesGlob } from "node:path";
import { name, version } from "./package.js";
import type { Extension } from "minify-kit";
import type { Plugin } from "./rollup.js.flow";
// eslint-disable-next-line no-duplicate-imports
import minify from "minify-kit";
export type { Plugin } from "./rollup.js.flow";

// eslint-disable-next-line no-undef
type ExtensionArray = ReadonlyArray<Extension>;

export type OptionExtension = ExtensionArray | Extension;

const defaultExtensions: ExtensionArray = [".html", ".css"];

function globifyExtensions(
    extensions: OptionExtension
): string {
    extensions = [extensions].flat();
    if (!extensions.length) extensions = defaultExtensions;
    return `**/*${extensions
        .join(",")
        .replace(/^\.([^,]+,.+)/, ".{$1}")
        .replace(/,\./g, ",")}`;
}

/**
 * Creates a Rollup plugin that minifies imported source files
 * during the build process.
 * @param options - The plugin configuration options.
 * @param options.extensions - The extensions of source files to minify.
 * @returns The Rollup plugin object.
 */
export default function minifyTemplate(
    options: { extensions: OptionExtension } = {
        extensions: defaultExtensions
    }
): Plugin {
    const EXTENSIONS_GLOB = globifyExtensions(
        options.extensions
    );
    return {
        name,
        version,

        /** Minifies source files. */
        transform(code, id) {
            if (!matchesGlob(id, EXTENSIONS_GLOB))
                return null;
            return {
                code: minify(extname(id), code),
                map: { mappings: "" }
            };
        }
    };
}