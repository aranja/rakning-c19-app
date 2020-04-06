# Rakning C-19 App

Rakning C-19 is an app that can be downloaded voluntarily and facilitates the contact tracing process amidst the ongoing Covid-19 pandemic in Iceland.

With the user's consent the app keeps their location data. In case the contact tracing team of the Department of Civil Protection and Emergency Management needs to track someone's movements, they will be asked to upload their location data.

This would allow for the tracing team to help retrace a user's movements for the last two weeks and increase the likelihood of identifying individuals you might have been in contact with. 

### Setup

Install dependencies:
```
yarn install
```

### Run instructions for iOS:

```
yarn ios
```

or:
* Open MyTestApp/ios/MyTestApp.xcworkspace in Xcode or run "xed -b ios"
* Hit the Run button

You need XCode and an Apple developer account to run this on device.

### Run instructions for Android:

Have an Android emulator running (quickest way to get started), or a device connected.
Then run:

```
yarn android
```

### FAQ

#### How does Rakning C-19 work?

It authenticates users with their phone number. It stores the user's
phone number, their locale and push notification token on the server.

Then the app requests permission to track the user's location in the
background. Geolocation updates are then stored on-device in a SQLite
database.

When the backend receives a request for data, it marks the user for data
collection and triggers a push notification.

Next time the user opens the app, it checks if there's a data request
and allows the user to approve the request before sending 14 days of
geolocation data to the backend.

For more information, check out the [System Architecture](https://docs.google.com/presentation/d/1SxGX7pXXMBcO2h7iYRRWI2Ru1oHRV19hZqU2RFYlXK4).

#### How does Rakning C-19 track the user's location?

Rakning C-19 uses a React Native plugin called [React Native Background Geolocation](https://github.com/mauron85/react-native-background-geolocation).
Behind the scenes, it calls different APIs on Android and iOS to get geolocation updates,
even when you don't have the application opens.

These geolocation updates are stored in an SQLite database that the plugin manages.

The logic is in `src/tracking.js`.

#### When does the app send geolocation data to the backend?

Only after the user explicitly approves a data collection request.

The logic is in `src/router/logged-in/screens/RequestDataScreen.js`.

#### What is the license for this code?

The Rakning C-19 app is now open source under the MIT license.

#### Do you accept contributions?

This project was done pro-bono by all involved parties and we have
limited time to continue working on it.

So we'll gladly accept contributions. Check out the issues for
places to start.
