import * as forums from './schema/forums';
import * as topics from './schema/topics';
import * as posts from './schema/posts';

export default {
  ...forums,
  ...topics,
  ...posts
};
