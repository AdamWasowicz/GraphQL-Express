import dotenv from "dotenv";
dotenv.config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import useDevCORS from "./middleware/use-dev-cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import resolvers, { ExpanedError } from './graphql/resolvers';
import mongoose from "mongoose";
import useAuth from "./middleware/auth";
import postRouter from './routes/post';


const app: Express = express();

// Pre-route
app.use(bodyParser.json());
app.use(useDevCORS);
app.use(useAuth);

// Requests
//  GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn(error) {
        if (!error.originalError){
            return error;
        }

        // Return custom error
        const oError = (error.originalError) as ExpanedError
        const data = oError.data;
        const message = oError.message || 'An error occured';
        const status = oError.status || 500;

        return { message: message, status: status, data: data }
    }
}));

// REST
app.use(postRouter);

// Connect to mongo
const mongoUrl = process.env.MONGO_URL!
mongoose.connect(mongoUrl)
.then(result => {
    app.listen(8080, '0.0.0.0', () => {
        console.log('Express working...');
    });
})
.catch(error => {
    console.log(error)
    console.log(mongoUrl)
})
