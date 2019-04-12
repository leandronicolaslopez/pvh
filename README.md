This is the repo for the solution for the PVH code challenge.

## Solution

The solution consists on two small projects.

## Api
This is the backend built in node js using express.

In order to get it started, the following command needs to be run in the root of the api project:

```
npm run start
```

The api should run in the same host as the mobile app, as the mobile project is targeting localhost.

### Tests:
The api project includes 3 simple tests. In order to execute them, the following command has to be run:

```
npm run test
```

## Mobile
This is the react native project. In order for it to work, the api needs to be running in the same host.

The app consists in three small screens: List of users, edit/create users and edit/create user address.

The app is hooked up to redux, where the list of users is stored as the app state in the root of the app. The users list in redux will now be updated every time the user updates or creates new users, or through the pull-to-refresh feature in the list screen.

### Validations:
The validations are performed individually to each field when it is focused and then focused out or to the whole screen when the submit button is pressed.
