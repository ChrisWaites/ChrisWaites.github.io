import React from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';


function Entry(props) {
  return (
    <p>
      <Button variant='outlined' href={props.href}>
        {props.children}
      </Button>
    </p>

  );
}


function Page() {
    return (
      <>
        <Entry href='https://invertibleworkshop.github.io/accepted_papers/pdfs/41.pdf'>
          <em>Differentially Private Normalizing Flows for Privacy-Preserving Density Estimation</em><br/>
          <hr/>
          Chris Waites and Rachel Cummings.<br/>
          <em>ICML Workshop on Invertible Neural Networks, Normalizing Flows, and Explicit Likelihood Models.</em>
        </Entry>

        <Entry href='https://arxiv.org/abs/1912.03250'>
          <em>Differentially Private Mixed-Type Data Generation For Unsupervised Learning</em><br/>
          <hr/>
          Uthaipon Tantipongpipat*, Chris Waites*, Digvijay Boob, Amaresh Ankit Siva, and Rachel Cummings.<br/>
          <em>arXiv:1912.03250.</em>
        </Entry>
      </>
    );
}

export default Page;
