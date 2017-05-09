# Wiki Part II

You will implement user authentication for the Wiki and then authorization to permit only logged in authors to edit the wiki.

## Setup

Install the bcrypt module for the backend.

## Sign up: Backend

Make an `POST /api/signup` API for new authors to sign up for an account on the wiki. It will be sent a name and a password and it will need to

* encrypt the password using bcrypt
* insert a new author into the database
* it should return the information about the author that was inserted, except for the password

## Sign up: Frontend


* form  
* login
  * form
  * backend - bcrypt.compare
  * generate a token
  * save token to DB
* authentication middleware
  * query the DB for matching token for operation
