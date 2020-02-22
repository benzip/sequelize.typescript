import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import styled from "styled-components";

import AddChef from "./AddChef";

interface Product {
  Id: string;
  ProductName: string;
}

interface QueryData {
  products: Product[];
}

const Chef = styled.div`
  margin-bottom: 1rem;
`;

const ChefName = styled.strong`
  font-size: 1.5rem;
`;

const Restaurant = styled.span`
  background-color: #eeeeee;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.25em;
  margin: 0.25rem 0.5rem 0.25rem 0;
`;

const Restaurants = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5rem;
`;

const Wrapper = styled.div``;

const query = gql`
  {
    products {
      Id
      ProductName
    }
  }
`;

const createProductMutation = gql`
  mutation($name: String!) {
    createProduct(ProductName: $name) {
      Id
      ProductName
    }
  }
`;

const Chefs = () => {
  const { data, loading, refetch } = useQuery<QueryData>(query);
  const [createProduct] = useMutation<{ createProduct: Product }, { name: string }>(createProductMutation);
  if (loading) return "Loading...";

  return (
    <Wrapper>
      {data &&
        data.products.map(product => (
          <Chef key={product.Id}>
            <ChefName>{product.ProductName}</ChefName>
          </Chef>
        ))}
      <AddChef
        onAddChef={async ({ name }) => {
          await createProduct({ variables: { name } });
          refetch();
        }}
      />
    </Wrapper>
  );
};

export default Chefs;
