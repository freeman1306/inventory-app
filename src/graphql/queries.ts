import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      name
      createdAt
      productsCount
      totalUSD
      totalUAH
      products {
        id
        name
        sn
        type
        status
        warrantyStart
        warrantyEnd
        priceUSD
        priceUAH
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      sn
      type
      status
      warrantyStart
      warrantyEnd
      priceUSD
      priceUAH
      orderId
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

export const UPDATE_PRODUCT_STATUS = gql`
  mutation UpdateProductStatus($id: ID!, $status: String!) {
    updateProductStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;