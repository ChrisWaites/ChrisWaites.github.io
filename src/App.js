import './App.css';

import Page from './components/page';
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import About from './pages/about';
import Research from './pages/research';
import Writing from './pages/writing';
import Reading from './pages/reading';
import Design from './pages/design';

import DifferentiallyPrivateDeepLearning from './posts/differentially-private-deep-learning';
import HowDifferentialPrivacyFitsIntoIndustry from './posts/how-differential-privacy-fits-into-industry';
import RiskAwareReinforcementLearning from './posts/risk-aware-reinforcement-learning';
import DeathsOfDespair from './posts/deaths-of-despair';

function App() {
  return (
    <Page>
      <Route exact path='/' component={About}/>

      <Route path='/about' component={About}/>
      <Route path='/research' component={Research}/>
      <Route path='/writing' component={Writing}/>
      <Route path='/reading' component={Reading}/>
      <Route path='/design' component={Design}/>

      <Route path='/deaths-of-despair' component={DeathsOfDespair} />
      <Route path='/how-differential-privacy-fits-into-industry' component={HowDifferentialPrivacyFitsIntoIndustry} />
      <Route path='/differentially-private-deep-learning' component={DifferentiallyPrivateDeepLearning} />
      <Route path='/risk-aware-reinforcement-learning' component={RiskAwareReinforcementLearning} />
    </Page>
  );
}

export default App;
