import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <div style={{display: 'flex',flexDirection: 'column' ,justifyContent: 'flex-end'}}>

          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
          </nav>

          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('leaderboard')} className='f3 link dim black underline pa3 pointer'>Leaderboard</p>
            <p onClick={() => onRouteChange('profile')} className='f3 link dim black underline pa3 pointer'>Your profile</p>
          </nav>


        </div>
      );
    } else {
      return (
        <div style={{display: 'flex',flexDirection: 'column' ,justifyContent: 'flex-end'}}>

          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
          </nav>
      
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
           <a href="https://github.com/hmahajan99" style={{ color: "inherit", textDecoration: "none"}}>
            <p className='f3 link dim black underline pa3 pointer'>Developer</p>
           </a>
          </nav>


        </div>

      );
    }
}

export default Navigation;