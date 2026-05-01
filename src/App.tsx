import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
