import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

// Types
export const TestDataType = new GraphQLObjectType({
    name: 'TestData',
    fields: {
        text: { type: GraphQLString },
        views: { type: GraphQLInt }
    }
})


export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        status: { type: GraphQLString },
        posts: { 
            type: GraphQLList(PostType),
            resolve: () => {}
        }
    })
})

export const PostType: any = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLID },
        content: { type: GraphQLID },
        imageUrl: { type: GraphQLID },
        creator: { type: UserType },
        createdAt: { type: UserType },
    })
})

export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        password: { type: GraphQLString }
    }
})

export const AuthDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: {
        token: { type: GraphQLString },
        userId: { type: GraphQLString }
    }
})

export const PostInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
    }
})

export const PostQueryOutputType = new GraphQLObjectType({
    name: 'PostQueryOutput',
    fields: {
        posts: { type: GraphQLList(PostType) },
        totalPosts: {type: GraphQLInt }
    }
})