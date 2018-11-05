# RJSDemo8 - Forms

[Slides](https://docs.google.com/presentation/d/1VNDFN2oIkKLUpKRZ7hkiRjyJTv3d7-Lp6eZJPZn2P5E/edit?usp=sharing)

1. Walk through the code:

   - Explain what this thing is
   - Explain that the backend has a protected route
   - Show the 401

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

5. Explain JWT. Install `jwt-decode`. Decode the token:

```bash
$ yarn add jwt-decode
```

`authActions.js`

```javascript
...
.then(user => console.log(jwt_decode(user.token)))
...
```
