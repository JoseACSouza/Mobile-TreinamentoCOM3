import { tableSchema } from "@nozbe/watermelondb";

export const postSchema = tableSchema({
  name: 'posts',
  columns: [
    {
      name: 'subject',
      type: 'string',
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'users_id',
      type: 'number',
    },
    {
      name: 'users_name',
      type: 'string',
    },
    {
      name: 'categories',
      type: 'string',
    },
    {
      name: 'categories_names',
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