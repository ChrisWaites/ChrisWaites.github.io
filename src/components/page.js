import React from 'react';
import StickyBox from 'react-sticky-box';
import { Link } from 'react-router-dom';

function Page(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ padding: '60px', width: '40%', textAlign: 'left' }}>
        {props.children}
      </div>
      <StickyBox style={{ paddingTop: '60px', textAlign: 'right' }}>
        <table>
          <tr><td>
            <strong><Link className='link' to='/'>Chris Waites</Link></strong>
          </td></tr>
          <tr><td>
            <Link className='link' to='/research'>Research</Link>
          </td></tr>
          <tr><td>
            <Link className='link' to='/writing'>Writing</Link>
          </td></tr>
          <tr><td>
            <Link className='link' to='/reading'>Reading</Link>
          </td></tr>
          <tr><td>
            <Link className='link' to='/design'>Design</Link>
          </td></tr>
          <tr><td>
            <a href='https://github.com/ChrisWaites'>Github</a>
          </td></tr>
        </table>
      </StickyBox>
    </div>
  );
}

export default Page;
