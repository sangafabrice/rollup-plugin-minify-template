import app from "./package.json" with { type: "json" };
const {
  name,
  version
} = app;
export { name, version };