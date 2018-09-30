import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Profile from './components/Profile/Profile';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);


    const clarifaiFaces = data.outputs[0].data.regions;
    const facesArray = []
    clarifaiFaces.forEach((element)=>{
      const clarifaiFace = element.region_info.bounding_box;
      facesArray.push({
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
      })
    })

    return facesArray;

  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://morning-lowlands-75595.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://morning-lowlands-75595.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))

      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    let jsxElement;

    if(route === 'home' || route === 'profile' || route === 'leaderboard'){

      if(route === 'profile'){

          jsxElement = (
           <div className="App">
              <Particles className='particles' params={particlesOptions} />
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
              <Profile name={this.state.user.name} email={this.state.user.email} onRouteChange={this.onRouteChange} />
            </div>  
          );

      }else if(route === 'leaderboard'){
     
          jsxElement = (
           <div className="App">
              <Particles className='particles' params={particlesOptions} />
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
              <Leaderboard />
            </div>  
          );

      }else{

          jsxElement = (
           <div className="App">
              <Particles className='particles' params={particlesOptions} />
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>  
          );
      }  

    }else if(route === 'signin'){

      jsxElement = (
          <div className="App">
            <Particles className='particles' params={particlesOptions} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          </div>
        );

    }else{

      jsxElement = (
          <div className="App">
            <Particles className='particles' params={particlesOptions} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          </div>
        );

    }

    return jsxElement;

  }
}

export default App;
