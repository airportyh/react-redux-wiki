# Wiki Part II

You will implement user authentication for the Wiki and then authorization to permit only logged in authors to edit the wiki.

## Setup

Install the bcrypt module for the backend.

## Sign up: Backend

Make an `POST /api/signup` API for new authors to sign up for an account on the wiki. It will be sent a name and a password in JSON format and it will need to

* encrypt the password using bcrypt
* insert a new author into the database
* it should return the information about the author that was inserted, except for the password (use the SQL returning statement)

## Sign up: Frontend

Create a `SignUp` form component containing a name field and a password field and then wire it up to use the sign up API you just created. For binding the form field values, you may choose to use component state (setState) or store state - using setState is a bit easier and makes sense because it's transient state. If you choose to use setState, this component does not require a reducer. For the form submission:

1. Create an action creator for `signUp` - it should make an API call to the sign-up API.
2. When the API returns, you should use hashHistory (`import { hashHistory } from 'react-router'`) to redirect the client-side URL to the home page.
3. If there's an error, it should dispatch an error action.

Add a link to the sign up page in your app layout.

## Login: Backend

Make a `POST /api/login` API that logs an author in and returns a login session token, which will grant him access to restricted API subsequently - a session token is proof that the author has logged in. The caller will send in a name and a password in JSON format. The API handler code has to:

1. Query the DB for the author data given the submitted name.
2. Use bcrypt.compare to check the submitted plain password and the encrypted password from the DB.
3. If the password matches, use the `uuid` module from npm (you need to install it), to generate a random token to use as a login token. You will save the token along with the author ID to the login_sessions table. Use the `returning` statement to return the information that was saved.
4. Send back the information that was saved to the response in JSON format.

## Login: Frontend

Build a login form component in the same manner as the signup form component. Unlike the sign up component, this component will has a reducer component - used to save the authentication token to the state.

1. Create a login form component, with an actions file, a component file, and a reducer file.
2. Again, for the binding the form element values, you may choose to use setState or the store state.
3. For submitting the form, call a function prop, say call it `login`.
4. Create a `login` action in the actions file. It should
  1. Make a request to the login API, sending the name and password in JSON format.
  2. On success, dispatch an `auth-success` action.
  3. On success, also use `hashHistory` from React Router to redirect back to the home page.
  4. On failure, dispatch an `auth-failure` action.
  5. Write a reducer function for the Login component to save the authentication token that's returned on a successful login to the state.

Mount the Login component into the route and add a link to it in the app layout navigation. Bonus: display a greeting to the logged in author in the navigation bar.

## Authorization: Backend

To disallow anonymous user from editing wiki pages, we will create an Express middleware - the gatekeeper to block access to authenticated APIs. The requirement for authentication is that for every request that needs to be authenticated - in this case, there is only the `PUT /api/page/:title` API with that requirement, an authentication token must be sent in as part of the JSON object in the body. The authentication token will be checked against the `login_session` table for a valid session, and the logged in author will be fetched using a join to the author table. It should filter out expired tokens based on the `expired` column. Attach the fetched author object to the request object for use later.

## Authorization: Frontend

We will disable the UI that allows people to edit the wiki page for users that are not logged in. Pass the login state to the `WikiPage` component via its container. Modify the render method to conditionally disable the "Toggle edit" button.

## Bonus: Remember the last author

Remember the last author who edited a page, and display the author on the wiki page.

## Bonus: Remember previous versions of a wiki page

Save every version of every wiki page to the database. It's up to you the architect the database.
