import React from 'react';
import GraphiQL from 'graphiql';
import { GRAPHQL_URL } from '../../../apollo/httpLink';
import defineBlock from '../../../utils/defineBlock';
import 'graphiql/graphiql.min.css';
import './GraphqlIDE.scss';

const bem = defineBlock('GraphqlIDE');

function graphQLFetcher(graphQLParams) {
  return fetch(GRAPHQL_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams)
  }).then((response) => response.json());
}

const GraphqlIDE = () => (
  <div className={bem()}>
    <GraphiQL fetcher={graphQLFetcher} />
  </div>
);

export default GraphqlIDE;
