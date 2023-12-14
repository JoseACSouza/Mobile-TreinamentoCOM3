import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import migrations from './model/migrations/migrations';

import { schemas } from "./schema";
import PostModel from './model/PostModel';
import CommentaryModel from "./model/CommentaryModel";

const adapter = new SQLiteAdapter({
  schema: schemas,
  migrations: migrations,
});

export const database = new Database({
  adapter,
  modelClasses: [PostModel, CommentaryModel], 
})

