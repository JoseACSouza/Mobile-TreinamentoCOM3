import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, children } from '@nozbe/watermelondb/decorators';

export default class PostModel extends Model {
  static table = 'posts';
  
  // static associations = {
  //   commentaries: { type: 'has_many', foreignKey: 'id' },
  // }

  @field('subject') subject;

  @field('content') content;

  @field('users_id') users_id;
  
  @field('users_name') users_name;

  @field('categories_names') categories_name;

  @field('categories') categories;

  @field('storage') storage;
  
  @field('synced') synced;

  @readonly @date('created_at') createdAt;
  
  
  @children('commentaries') commentaries;

  async markAsDeleted() {
    // await this.comments.destroyAllPermanently()
    await super.markAsDeleted()
  }
}
