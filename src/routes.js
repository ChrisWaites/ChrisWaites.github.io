import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

import PostPage from './posts/how-differential-privacy-fits-into-industry';

function routes() {
  return (
    <Route path="/" component={App}>
      <Route path="/how-differential-privacy-fits-into-industry" component={PostPage} />
    </Route>
  );
}

export default routes;
