const Authors = require('./data/authors');
const Posts = require('./data/posts');
const _ = require('lodash')
const {buildSchema} = require('graphql');

let {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents the author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
    })
})

const postType = new GraphQLObjectType({
    name: "Post",
    description: "This represents a post",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body:  {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: function (post) {
                return _.find(Authors, a => a.id == post.author_id)
            }
        }
    })
})

// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
      authors: {
        type: new GraphQLList(AuthorType),
        description: "List of all Authors",
        resolve: function() {
          return Authors
        }
      },
      posts: {
        type: new GraphQLList(postType),
        description: "List of all Posts",
        resolve: function() {
          return Posts
        }
      }
    })
  });

  const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
  });
  module.exports = BlogAppSchema;