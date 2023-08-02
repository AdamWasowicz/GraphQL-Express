import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLBoolean } from "graphql";

// Types
var TestDataType = new GraphQLObjectType({name: 'TestData', fields: {}})
var RootQueryType = new GraphQLObjectType({name: 'RootQuery',fields: {}})
var PostType = new GraphQLObjectType({name: 'Post', fields:{}})
var UserType = new GraphQLObjectType({name: 'User',fields: {}})
var UserInputType = new GraphQLInputObjectType({name: 'UserInput', fields: {}})
var RootMutationType = new GraphQLObjectType({name: 'RootMutation', fields: {}});
var AuthDataType = new GraphQLObjectType({name: 'AuthData', fields: {}})
var PostInputType = new GraphQLInputObjectType({name: 'PostInput', fields: {}})
var PostQueryOutputType = new GraphQLObjectType({name: 'PostQueryOutput', fields: {}})



// Roots
RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: TestDataType,
            args: {
                text: { type: GraphQLString },
                views: { type: GraphQLInt }
            },
        },

        login: {
            type: AuthDataType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            }
        },

        posts: {
            type: PostQueryOutputType,
            args: {
                page: { type: GraphQLInt }
            }
        },

        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            }
        }
    }
})

RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                userInput: { type: UserInputType}
            }
        },

        createPost: {
            type: PostType,
            args: {
                postInput: { type: PostInputType}
            }
        },

        updatePost: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
                postInput: { type: PostInputType }
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

// Types
TestDataType = new GraphQLObjectType({
    name: 'TestData',
    fields: {
        text: { type: GraphQLString },
        views: { type: GraphQLInt }
    }
})

UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        status: { type: GraphQLString },
        posts: { type: GraphQLList(PostType)}
    }
})

PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLID },
        content: { type: GraphQLID },
        imageUrl: { type: GraphQLID },
        creator: { type: GraphQLNonNull(UserType) },
        createdAt: { type: GraphQLNonNull(UserType) },
    }
})

UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        password: { type: GraphQLString }
    }
})

AuthDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: {
        token: { type: GraphQLString },
        userId: { type: GraphQLString }
    }
})

PostInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
    }
})

PostQueryOutputType = new GraphQLObjectType({
    name: 'PostQueryOutput',
    fields: {
        posts: { type: GraphQLList(PostType) },
        totalPosts: {type: GraphQLInt }
    }
})


export {
    RootQueryType,
    RootMutationType
};