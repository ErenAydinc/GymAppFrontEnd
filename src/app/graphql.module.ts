import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from "apollo-angular/http"

const uri = 'https://localhost:7087/api/' // our GraphQL API

export function createAppollo(httpLink:HttpLink):ApolloClientOptions<any>{
    return{
        link:httpLink.create({uri:uri}),
        cache:new InMemoryCache(),
    }
}