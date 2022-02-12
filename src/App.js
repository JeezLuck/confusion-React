import { Component } from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { DISHES } from './shared/dishes';
import Main from './components/MainComponent';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
        };
  }

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
