# RJSDemo8 - Forms

[Slides](https://docs.google.com/presentation/d/1VNDFN2oIkKLUpKRZ7hkiRjyJTv3d7-Lp6eZJPZn2P5E/edit?usp=sharing)

1. Walk through the code:

   - Explain what this thing is
   - Explain that the backend has a protected route
   - Show the 401

#### Basic Auth

2. Wire up some redux:

`actionTypes.js`

```javascript
export const SET_CURRENT_USER = "SET_CURRENT_USER";
```

`authReducer.js`

```javascript
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};
```

`reducers/index.js`

```javascript
import thingReducer from "./thingReducer";
import authReducer from "./authReducer";

export default combineReducers({
  things: thingReducer,
  auth: authReducer
});
```

`authActions.js`

```javascript
// NOT exported.
// Will only be used internally by other actions.
const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
```

`actions/index.js`

```javascript
// Nothing to export yet
export {} from "./authActions";
```

3. Add a login action:

`authActions.js`

```javascript
export const login = userData => {
  return dispatch => {
    axios
      .post("https://precious-things.herokuapp.com/login/", userData)
      .then(res => res.data)
      // For now just log user
      .then(user => console.log(user))
      .catch(err => console.error(err.response));
  };
};
```

4. Connect action to `Login.js`. Show the token being logged.

```javascript
...
  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }
...
const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(actionCreators.login(userData))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
```

5. Explain JWT. Install `jwt-decode`. Decode the token. Set the user:

```bash
$ yarn add jwt-decode
```

`authActions.js`

```javascript
...
.then(user => console.log(jwt_decode(user.token)))
...
```

to

```javascript
...
.then(user => {
    const decodedUser = jwt_decode(user.token);
    dispatch(setCurrentUser(decodedUser));
})
...
```

6. Still not able to make the request! Time to `setAuthToken`:

`authActions.js`

```javascript
const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = `jwt ${token}`;
};

...

const login = userData => {
    ...
    .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
      })
    ...
}
```

#### Signup

7. Implement signup action:

`authActions.js`

```javascript
export const signup = userData => {
  return dispatch => {
    axios
      .post("https://precious-things.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
      })
      .catch(err => console.error(err.response));
  };
};
```

8. Connect to `Signup.js`. This will work BUT THE UX IS BAD (no indication that it worked!):

```javascript
...
handleSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state);
}
...
const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(actionCreators.signup(userData))
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);
```

#### UX Features

##### Logout Button

1. Logout Component:

`Logout.js`

```javascript
import React from "react";
import { connect } from "react-redux";

const Logout = props => {
  return (
    <button className="btn btn-danger" onClick={() => alert("LOGOUT!!")}>
      Logout {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Logout);
```

2. Conditional render:

`Navbar.js`

```javascript
const Navbar = props => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      {props.user ? <Logout /> : <Login />}
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Navbar);
```

3. Logout action:

`authActions.js`

```javascript
export const logout = () => setCurrentUser();
```

4. Wire logout button:

`Logout.js`

```javascript
// Actions
import * as actionCreators from "./store/actions";
...
<button className="btn btn-danger" onClick={props.logout}>
    Logout {props.user.username}
</button>
...
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});
```

##### DO NOT SHOW USERS THINGS THEY CAN'T USE!

1. Conditionally render the treasure button:

`Home.js`

```javascript
const Home = props => {
  return (
    ...
    {props.user && (
    <Link to="/treasure" className="btn btn-lg btn-warning mx-auto">
        TREASURE
    </Link>
    )}
    ...
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});
```

##### Redirect after signup

1. Demonstrate the `history` object in `Singup.js`. Explain where it came from:

```javascript
...
render() {
    const { username, email, password } = this.state;
    console.log(this.props.history);
    ...
}
...
```

to

```javascript
...
render() {
    const { username, email, password } = this.state;
    this.props.history.push('/');
    ...
}
...
```

2. Modify action to accept `history`:

`authActions.js`

```javascript
export const signup = (userData, history) => {
  return dispatch => {
    ...
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
    ...
  };
};
```

`Signup.js`

```javascript
class Signup extends Component {
  ...
  handleSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state, this.props.history);
  }
  ...
}

const mapDispatchToProps = dispatch => ({
  signup: (userData, history) =>
    dispatch(actionCreators.signup(userData, history))
});
```

##### PrivateRoutes

Don't allow users to access pages they can't use! Redirect from private pages!

1. Private Route:

`PrivateRoute.js`

```javascript
const PrivateRoute = ({ component: Component, user, redirectUrl, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? <Component {...props} /> : <Redirect to={redirectUrl || "/"} />
    }
  />
);

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(PrivateRoute);
```

2. Use private route for pages that require auth:

`App.js`

```javascript
<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/garbage" component={Garbage} />
  <PrivateRoute path="/treasure" component={Treasure} />
  <Route path="/signup" component={Signup} />
  <Redirect to="/" />
</Switch>
```

##### Persistent Login

If the page refreshes after sign in, I should STILL be signed in!

1. Add an action that checks for a token:

`authActions.js`

```javascript
```
