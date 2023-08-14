## How to use
### 1. Configure app params:
Change values in <b>.env</b> file.

### 2. Run with Docker:
``` sh
docker compose up
```

## API routes
Visit '/graphql' for for GraphQL server.

### GraphQL
#### Query:
- <b>hello</b> - for testing
- <b>login</b> - login
- <b>posts</b> - get posts using query
- <b>post</b> - get post using id

#### Mutations:
- <b>createUser</b> - create new user
- <b>createPost</b> - create new post
- <b>updatePost</b> - update existing post
- <b>deletePost</b> - delete existing post

### REST
Visit '/docs' for opeanapi documentation.

#### Post
- <b>GET '/post'</b> - get all posts
- <b>GET '/post/:postId'</b> - get post by id
- <b>GET '/post/query'</b> - get posts by query\
- <b>POST'/post'</b> - create new post
- <b>DELETE '/post/:postId'</b> - delete post by id
- <b>PATCH '/post'</b> - update post
### Auth
- <b>PUT'/signup'</b> - create new user
- <b>POST'/signup'</b> - login
