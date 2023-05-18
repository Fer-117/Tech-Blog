const User = require('./User');
const BlogPost = require('./BlogPosts');
const Comments = require('./Comments');

// User - Blog post relationships
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

// User to comments relationships
User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
});

// blogposts to comments relationships
BlogPost.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(BlogPost, {
  foreignKey: 'post_id',
});

module.exports = { User, BlogPost, Comments };
