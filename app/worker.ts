import { startWorker } from "jazz-tools/worker";

export const { worker } = await startWorker({
  syncServer: "wss://cloud.jazz.tools/?key=jazzbase@garden.co",
});