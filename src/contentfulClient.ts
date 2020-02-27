import * as contentful from "contentful";
import config from "./config";

const client = contentful.createClient(config.contentful);

export { client };
