import React from 'react';
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
        <Entry href='https://law.stanford.edu/wp-content/uploads/2019/01/Bellovin_20190129.pdf'>
            Privacy and Synthetic Datasets
        </Entry>
        <Entry href='https://cset.georgetown.edu/wp-content/uploads/Keeping-Top-AI-Talent-in-the-United-States.pdf'>
            Keeping Top AI Talent in the United States
        </Entry>
        <Entry href='http://web.stanford.edu/class/psych209/Readings/LakeEtAlBBS.pdf'>
            Building Machines That Learn and Think Like People
        </Entry>
        <Entry href='https://arxiv.org/abs/1911.09421'>
            The Linear Algebra Mapping Problem
        </Entry>
        <Entry href='https://arxiv.org/abs/1905.02175'>
            Adversarial Examples Are Not Bugs, They Are Features
        </Entry>
        <Entry href='https://arxiv.org/abs/2003.03384'>
            AutoML-Zero: Evolving Machine Learning Algorithms From Scratch
        </Entry>
      </>
    );
}

export default Page;
