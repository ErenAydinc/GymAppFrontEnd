import { gql } from "apollo-angular";

const GET_USERS=gql`
 query{
    users{
        id
        firstName
        lastName
        email
    }
 }
`

const ADD_USER=gql`
 mutation addUser($firstName:String!,$lastName:String!,$email:String!,$password:String!){
 addUser(firstName:$firstName,lastName:$lastName,email:$email)
  firstName
  lastName
  email
  password
 }
`

export {GET_USERS,ADD_USER}