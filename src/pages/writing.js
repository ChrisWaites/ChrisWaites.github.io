import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../App.css';

function Entry(props) {
  return (
    <p>
      <Button variant='outlined' href={props.href}>
        <em>{props.children}</em>
      </Button>
    </p>
  );
}

function Page() {
    return (
      <>
        <Entry href='/writing/risk-aware-reinforcement-learning'>
          Risk-Aware Reinforcement Learning
        </Entry>
        <Entry  href='/writing/how-differential-privacy-fits-into-industry'>
          How Differential Privacy (Could) Fit Into Industry
        </Entry>
        <Entry href='/writing/differentially-private-deep-learning'>
          A Guide to Differentially Private Deep Learning
        </Entry>
      </>
    );
}

export default Page;
