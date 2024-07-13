import { createClient } from "redis";

export let client = null;
let options = {};

export const init = async () => {
  // Initialize the Redis client
  options = {
    url: `redis://${process.env.REDIS_HOST || "localhost"}:${
      process.env.REDIS_PORT || 6380
    }`,
  };
};

export const connect = async () => {
  client = createClient(options);
  client.on("error", (err) => console.log("Redis error:", err));
  await client.connect();
};
