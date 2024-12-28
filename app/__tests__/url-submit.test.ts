import { shortest } from "@antiwork/shortest";

shortest("Validate that we can submit a URL and get a response", {
  url: process.env.TEST_URL,
});
