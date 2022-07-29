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
  try {
    await db.del(key);
  } catch (error) {f
    console.warn(`DB ${key} not found`);
  }
};

const getAll = async (status) => {
    let items = [];

    try {
        for await (const data of db.iterator()) {
            const [_, value] = data;
            if (value.status === status) {
                items.push(data);
            }
        }
    } catch (err) {
        console.error(err);
        items = [];
    }

    return items;
};

export { write, read, update, del, getAll };
