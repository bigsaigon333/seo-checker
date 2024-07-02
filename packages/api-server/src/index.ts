import { startServer } from "./server.js";

try {
  await startServer();
} catch (error) {
  console.error("Error starting server:", error);
}
