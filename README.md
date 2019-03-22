[![Build Status](https://travis-ci.com/Emile-Nsengimana/EPICmail-challenge-iii.svg?branch=develop)](https://travis-ci.com/Emile-Nsengimana/EPICmail-challenge-iii) [![Coverage Status](https://coveralls.io/repos/github/Emile-Nsengimana/EPICmail-challenge-iii/badge.svg?branch=develop)](https://coveralls.io/github/Emile-Nsengimana/EPICmail-challenge-iii?branch=develop) <a href="https://codeclimate.com/github/Emile-Nsengimana/EPICmail-challenge-iii/maintainability"><img src="https://api.codeclimate.com/v1/badges/4e1ded14dcc8fa7e25bf/maintainability" /></a>
# EPICmail
Is a web app that helps people exchange messages/information over the internet.
#### Heroku(https://challenge-iii.herokuapp.com)
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
| `/api/v2/messages/inbox/` | GET | display user's inbox message(s) |
| `/api/v2/messages/sent/` | GET | display user's sent message(s) |
| `/api/v2/messages/unread/` | GET | display user's unread message(s) |
| `/api/v2/messages/read/` | GET | display user's read message(s) |
| `/api/v2/groups/` | POST | create a group |
| `/api/v2/groups/` | GET | display all groups |
| `/api/v2/groups/<groupId>` | GET | display specific group info |
| `/api/v2/groups/<groupId>` | DELETE | delete a specific group |
| `/api/v2/groups/<groupId>/<groupName>` | PATCH | change group name |

### HOW CAN IT BE MANUAL TESTED
- Use [postman](https://www.getpostman.com/downloads/) to test out the API endpoints
- Use the heroku link to test this API endpoints
