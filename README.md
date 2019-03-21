[![Build Status](https://travis-ci.com/Emile-Nsengimana/EPICmail-challenge-iii.svg?branch=develop)](https://travis-ci.com/Emile-Nsengimana/EPICmail-challenge-iii) [![Coverage Status](https://coveralls.io/repos/github/Emile-Nsengimana/EPICmail-challenge-iii/badge.svg?branch=develop)](https://coveralls.io/github/Emile-Nsengimana/EPICmail-challenge-iii?branch=develop)
# EPICmail
Is a web app that helps people exchange messages/information over the internet.
### Requirements

- `Nodejs` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `NPM` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development
### SETUP
First clone it to your machine:
```
https://github.com/Emile-Nsengimana/EPICmail-challenge-iii.git
cd EPICmail-challenge-iii
```
Install all necessary node modules
```
npm install
```
Start the app
```
npm start
```
Run tests
```
npm test
```

### API ENDPOINTS
| API | Methods  | Description  |
| ------- | --- | --- |
| `/api/v2/auth/signup` | POST | user signup |
| `/api/v2/auth/login` | POST | user login |
| `/api/v2/messages` | POST | send message |
| `/api/v2/messages/:email` | GET | display user's email |
| `/api/v2/messages/inbox/:email` | GET | display user's inbox message(s) |
| `/api/v2/messages/sent/:email` | GET | display user's sent message(s) |


### HOW CAN IT BE MANUAL TESTED
- Use [postman](https://www.getpostman.com/downloads/) to test out the API endpoints
