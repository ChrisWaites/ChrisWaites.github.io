import React from 'react';
import Research from './research';

function Page() {
    return (
      <>
        <p>
          <img src='./academic-banner.jpeg' style={{ borderRadius: '10px', width: '100%' }} />
        </p>
        <p>
          Hi! Im Chris.
        </p>
        <p>
          Currently, I{"\'"}m doing my M.S. in Computer Science at <a href='https://www.stanford.edu/'>Stanford University</a>. Previously, I did my B.S. in Computer Science at the Georgia Institute of Technology.
        </p>
        <h3>
          Research
        </h3>
        <Research/>
      </>
    );
}

export default Page;
