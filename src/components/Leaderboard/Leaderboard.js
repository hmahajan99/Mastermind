import React from 'react';
import Card from './LeaderboardCard';

class Leaderboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      topUsers: []
    }
  }

  componentDidMount() {
    fetch('https://morning-lowlands-75595.herokuapp.com/leaderboard')
      .then(response => response.json())
      .then(users => {this.setState({ topUsers: users})})
      .catch(err => 'error getting leaderboard')
  }


  render() {

      console.log(this.state)
      const {topUsers} =  this.state;

      return (
        <div style={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap'}}>
        
        {  
          topUsers.map((user,i)=>{
            return (
              <Card key={i} user={user} />
            )
          })
        }

        </div>
      )

  }

}

export default Leaderboard;