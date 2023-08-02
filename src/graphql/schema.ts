import { GraphQLSchema} from "graphql"
import { RootQueryType, RootMutationType } from './types';

const schema = new GraphQLSchema({ query: RootQueryType, mutation: RootMutationType });
export default schema;