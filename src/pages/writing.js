import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../App.css';

function Entry(props) {
  return (
    <p>
      <Link className='link' to={props.href}>
        <Button variant='outlined' href={props.href}>
          <em>{props.children}</em>
        </Button>
      </Link>
    </p>
  );
}

function Page() {
    return (
      <>
        <Entry href='/machine-unlearning'>
          Data Deletion in Machine Learning
        </Entry>
        <Entry href='/risk-aware-reinforcement-learning'>
          Risk-Aware Reinforcement Learning
        </Entry>
        <Entry href='/how-differential-privacy-fits-into-industry'>
          Where Differential Privacy (Could) Fit Into Industry
        </Entry>
        <Entry href='/differentially-private-deep-learning'>
          A Practitioner{"\'"}s Guide to Differentially Private Deep Learning
        </Entry>
      </>
    );
}

export default Page;