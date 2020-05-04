import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const API_PUBLIC_URL = "https://peaceful-ravine-56478.herokuapp.com/"

const particlesOptions = {
  particles: {
    number: {
      value: 50,
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
  boxes: {},
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
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)

    const boxes = regions.map((obj, i) => {
      const clarifaiFace = obj.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    })
    return boxes;
  }

  displayFacebox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input })
      fetch(`${API_PUBLIC_URL}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: this.state.input })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${API_PUBLIC_URL}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(
              Object.assign(this.state.user, { entries: count})
            )
          })
          .catch(console.error)
        }
        this.displayFacebox(this.calculateFaceLocation(response))
      })
      .catch(console.error)
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    } 
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, user, boxes, imageUrl, route } = this.state;
    return (
      <div className="App">
        <Particles 
          className='particles'   
          params={particlesOptions} 
        />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange} 
        />
        <Logo />
        {
          route === 'home' 
            ? <div>
                <Rank 
                  name={user.name}
                  entries={user.entries}
                />
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onImageSubmit={this.onImageSubmit}
                /> 
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
              </div>
            : (
                route === 'signin'
                ? <Signin 
                    loadUser={this.loadUser} 
                    onRouteChange={this.onRouteChange} 
                  />
                : <Register 
                    loadUser={this.loadUser} 
                    onRouteChange={this.onRouteChange}
                  />
              )
        }
      </div>
    )
  }
}

export default App;
