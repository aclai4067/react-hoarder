import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../helpers/data/authData';
import Auth from '../components/pages/Auth/Auth';
import MyNav from '../components/shared/MyNav/MyNav';
import Home from '../components/pages/Home/Home';
import StuffForm from '../components/pages/StuffForm/StuffForm';
import MyStuff from '../components/pages/MyStuff/MyStuff';
import SingleStuff from '../components/pages/SingleStuff/SingleStuff';

authData.firebaseApp();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    editMode: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, editMode } = this.state;

    return (
      <div className="App">
        <Router>
          <MyNav authed={authed} editMode={editMode} />
          <Switch>
            <PrivateRoute path='/' exact component={Home} authed={authed} />
            <PublicRoute path='/auth' exact component={Auth} authed={authed} />
            <PrivateRoute path='/stuff' exact component={MyStuff} authed={authed} />
            <PrivateRoute path='/stuff/new' exact component={StuffForm} authed={authed} />
            <PrivateRoute path='/stuff/:stuffId' exact component={SingleStuff} authed={authed} />
            <PrivateRoute path='/stuff/:stuffId/edit' exact component={StuffForm} authed={authed} toggleEditMode={this.toggleEditMode} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
