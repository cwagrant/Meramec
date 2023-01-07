import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from "./App";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );

  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  );
});
