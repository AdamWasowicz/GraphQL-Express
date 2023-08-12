import { GraphQLSchema} from "graphql"
import * as t from './types';
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLID, GraphQLBoolean } from "graphql";

// Roots
const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: t.TestDataType,
            args: {
                text: { type: GraphQLString },
                views: { type: GraphQLInt }
            },
        },

        login: {
            type: t.AuthDataType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            }
        },

        posts: {
            type: t.PostQueryOutputType,
            args: {
                page: { type: GraphQLInt }
            }
        },

        post: {
            type: t.PostType,
            args: {
                id: { type: GraphQLID }
            }
        }
    }
})

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createUser: {
            type: t.UserType,
            args: {
                userInput: { type: t.UserInputType}
            }
        },

        createPost: {
            type: t.PostType,
            args: {
                postInput: { type: t.PostInputType}
            }
        },

        updatePost: {
            type: t.PostType,
            args: {
                id: { type: GraphQLID },
                postInput: { type: t.PostInputType }
            }
        },

        deletePost: {
            type: GraphQLBoolean,
            args: {
                id: { type: GraphQLID }
            }
        }
    }
})

const schema = new GraphQLSchema({ query: RootQueryType, mutation: RootMutationType });


export default schema;