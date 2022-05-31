import "dotenv/config";
import { start, stop } from "./libp2p-node.js";
import { write, read } from "./db.js";

import { toString } from "uint8arrays/to-string";
import { fromString } from "uint8arrays/from-string";

start({
  "/discover/1.0.0": () => fromString(process.env.SERVICE_NAME),
  "/write/1.0.0": async (key) => {
    key = toString(key);
    let tokens = key.split("##");
    await write(tokens[0], tokens[1]);
    return fromString("ok");
  },
  "/read/1.0.0": async (key) => {
    key = toString(key);
    let result = await read(key);
    return fromString(result);
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