import './App.css';

import Page from './components/page';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
      <Switch>
        <Route exact path='/' component={About}/>

        <Route exact path='/about' component={About}/>
        <Route exact path='/research' component={Research}/>
        <Route exact path='/writing' component={Writing}/>
        <Route exact path='/reading' component={Reading}/>
        <Route exact path='/design' component={Design}/>

        <Route exact path='/writing/deaths-of-despair' component={DeathsOfDespair} />
        <Route exact path='/writing/how-differential-privacy-fits-into-industry' component={HowDifferentialPrivacyFitsIntoIndustry} />
        <Route exact path='/writing/differentially-private-deep-learning' component={DifferentiallyPrivateDeepLearning} />
        <Route exact path='/writing/risk-aware-reinforcement-learning' component={RiskAwareReinforcementLearning} />
      </Switch>
    </Page>
  );
}

export default App;
