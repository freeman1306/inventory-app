import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sn: String!
    type: String!
    status: String!
    warrantyStart: String!
    warrantyEnd: String!
    priceUSD: Float!
    priceUAH: Float!
    orderId: ID!
  }

  type Order {
    id: ID!
    name: String!
    createdAt: String!
    products: [Product!]!
    totalUSD: Float!
    totalUAH: Float!
    productsCount: Int!
  }

  type Query {
    orders: [Order!]!
    products: [Product!]!
    order(id: ID!): Order
    product(id: ID!): Product
    productsByType(type: String!): [Product!]!
  }

  type Mutation {
    deleteOrder(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    updateProductStatus(id: ID!, status: String!): Product!
  }
`;