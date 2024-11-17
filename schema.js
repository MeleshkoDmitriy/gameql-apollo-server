export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    description: String!
    price: Float!
    genre: [String!]!
    image: String!
    isAdminLiked: Boolean!
    platform: [String!]!
    reviews: [Review]
  }
  type Review {
    id: ID!
    content: String!
    rating: Int!
    game: Game!
    user: User!
  }
  type User {
    id: ID!
    username: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game!]!
    game(id: ID!): Game 
    users: [User!]!
    user(id: ID!): User 
    reviews: [Review]
    review(id: ID!): Review 
  }
  type Mutation {
    deleteReview(id: ID!): [Review]
    addReview(review: AddReviewInput!): Review
    likeGameByAdmin(id: ID!): Game
  }
  input AddReviewInput {
    content: String!
    rating: Int!
    gameId: ID!
  }
`