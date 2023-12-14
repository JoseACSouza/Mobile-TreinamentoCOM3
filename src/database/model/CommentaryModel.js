import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';

export default class CommentaryModel extends Model {
  static table = 'commentaries';
  // static associations = {
  //   commentaries: { type: 'belongs_to', key: 'post_id' },
  // }

  @field('content') content;

  @field('users_id') users_id;

  @field('users_name') users_name;

  @field('post_id') post_id;

  // @relation('posts', 'post_id') post;

  @field('storage') storage;
  
  @field('synced') synced;

  @readonly @date('created_at') createdAt;
  
}
