import "dotenv/config";
import { start, stop } from "./libp2p-node.js";
import { write, update, del } from "./db.js";

import { toString } from "uint8arrays/to-string";
import { fromString } from "uint8arrays/from-string";

start({
  "/discover/1.0.0": () => fromString(process.env.SERVICE_NAME),

  "/capture/1.0.0": async (key) => {
    key = toString(key);
    let tokens = key.split("##");
    let value = JSON.parse(tokens[1]);
    value.status = "captured";
    await write(tokens[0], value);
    return fromString(JSON.stringify(value));
  },

  "/verify/1.0.0": async (key) => {
    key = toString(key);
    let tokens = key.split("##");
    let value = JSON.parse(tokens[1]);
    value.status = "verified";
    await update(tokens[0], value);
    return fromString(JSON.stringify(value));
  },

  "/publish/1.0.0": async (key) => {
    key = toString(key);
    await del(key);
    return fromString(`${key} deleted`);
  },
})
  .then()
  .catch(console.error);

const exit = async () => {
  await stop();
  process.exit(0);
};

process.on("SIGTERM", exit);
process.on("SIGINT", exit);
