import { Level } from "level";

const db = new Level("db", { valueEncoding: "json" });

const write = async (key, value) => {
  try {
    await db.get(key);
  } catch (error) {
    await db.put(key, value);
  }
};

const read = async (key) => {
  let result = "";
  try {
    result = await db.get(key);
  } catch (error) {
    console.warn(`DB ${key} not found`);
  }
  return result;
};

const update = async (key, value) => {
  await del(key);
  await write(key, value);
};

const del = async (key) => {
  let result = "";
  try {
    result = await db.del(key);
  } catch (error) {f
    console.warn(`DB ${key} not found`);
  }
};

const getAllCapturedItems = async () => {

    let capturedItems = [];

    try {
        for await (const data of db.iterator()) {
            const [key, value] = data;
            if (value.status === "captured") {
                capturedItems.push(data);
            }
        }

        return capturedItems;
    } catch (err) {
        console.error(err)

        return capturedItems;
    }
};

export { write, read, update, del, getAllCapturedItems };
