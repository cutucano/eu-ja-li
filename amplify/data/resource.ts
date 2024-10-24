import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { User } from "aws-cdk-lib/aws-iam";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
  Todo: a
    .model({
      content: a.string(),    
    }).authorization(allow => [allow.owner()]),
 
  Book: a
    .model({
      bookId: a.id().required(), 
      name: a.string(),
      pages: a.integer(),
      image: a.url(),
      styleId: a.id(),
      style: a.belongsTo('Style', 'styleId')
    })
    .identifier(['bookId'])
   .authorization(allow => [allow.authenticated()]),

  Style: a
    .model({
      styleId: a.id().required(),
      name: a.string().required(),
      books: a.hasMany('Book', 'styleId'),
      trophy: a.hasMany('Trophy', 'styleId'),
    }).identifier(['styleId'])
    .authorization(allow => [allow.authenticated()]),
      
  Trophy: a 
  .model({
    trophyId: a.id().required(),
    styleId: a.id(),
    userId:a.id(),
    style: a.belongsTo('Style', 'styleId'),
    count: a.integer(),
  }).identifier(['trophyId'])
  .authorization(allow => [allow.owner()]),

  Achievement: a
    .model({
      achivementId: a.id().required(),
      userId: a.id(),
      count: a.integer(),
    }).identifier(['achivementId'])
    .authorization(allow => [allow.authenticated()]),   

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
      defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
