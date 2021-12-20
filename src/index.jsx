import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import App from './components/main/App';
import FavoritesProvider from './components/utilities/favorites/FavoritesProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';

ReactDOM.render(
  <ApolloProvider client={client}>
    <FavoritesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavoritesProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
