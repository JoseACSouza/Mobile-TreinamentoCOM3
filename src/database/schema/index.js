import { appSchema } from "@nozbe/watermelondb";

import { postSchema } from "./PostSchema";
import { commentariesSchema } from "./CommentariesSchema";

export const schemas = appSchema({
  version: 2,
  tables: [postSchema, commentariesSchema],
})