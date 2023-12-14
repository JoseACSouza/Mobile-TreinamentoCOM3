import { tableSchema } from "@nozbe/watermelondb";

export const commentariesSchema = tableSchema({
  name: 'commentaries',
  columns: [
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'users_id',
      type: 'string',
    },
    {
      name: 'post_id',
      type: 'string',
    },
    {
      name: 'users_name',
      type: 'string',
    },
    {
      name: 'storage',
      type: 'string',
      isOptional: true
    },
    {
      name: 'synced',
      type: 'boolean',
    },
    {
      name: 'created_at',
      type: 'number'
    },
  ]
});