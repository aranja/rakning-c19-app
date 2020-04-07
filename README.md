# Rakning C-19 App

Rakning C-19 is an app that can be downloaded voluntarily and facilitates the contact tracing process amidst the ongoing Covid-19 pandemic in Iceland.

With the user's consent the app keeps their location data. In case the contact tracing team of the Department of Civil Protection and Emergency Management needs to track someone's movements, they will be asked to upload their location data.

This would allow for the tracing team to help retrace a user's movements for the last two weeks and increase the likelihood of identifying individuals you might have been in contact with. 

## Setup

Make sure you have a [Node 12+](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) set up on your machine.

Then go to the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) page, click the `React Native CLI Quickstart` tab, then select your `Development OS` and `Target OS` to get a detailed guide to configure your machine for app development.

Finally, install the project dependencies:

```
yarn install
```

## Run instructions for iOS:

```
yarn ios
```

or:
* Open MyTestApp/ios/MyTestApp.xcworkspace in Xcode or run "xed -b ios"
* Hit the Run button

You need XCode and an Apple developer account to run this on device.

## Run instructions for Android:

Have an Android emulator running (quickest way to get started), or a device connected.
Then run:

```
yarn android
```

## FAQ

### How does Rakning C-19 work?

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

### How does Rakning C-19 track the user's location?

Rakning C-19 uses a React Native plugin called [React Native Background Geolocation](https://github.com/mauron85/react-native-background-geolocation).
Behind the scenes, it calls different APIs on Android and iOS to get geolocation updates,
even when you don't have the application opens.

These geolocation updates are stored in an SQLite database that the plugin manages.

The logic is in `src/tracking.js`.

### When does the app send geolocation data to the backend?

Only after the user explicitly approves a data collection request.

The logic is in `src/router/logged-in/screens/RequestDataScreen.js`.

### Why Open Source?

The app is now open source under the MIT License. There are three main reasons:

* We want to encourage and facilitate cooperation between nations through this pandemic.
* We want more contributors to make the app better. It’s been a volunteer project from the beginning, so we have limited time to work on it.
* We want total transparency in how the app works precisely.

Please help us improve the app for all.

We're still evaluating if/how we want to open source the API.

### Who is behind this project?

The project is a private initiative developed in a close collaboration with the [Icelandic Directorate of Health](https://www.landlaeknir.is/english/) and the [Department of Civil Protection and Emergency Management](https://www.almannavarnir.is/english/).

It was produced by [Aranja](https://aranja.com/), [Decode](https://www.decode.com/), [Kolibri](https://www.kolibri.is/), [Samsyn](http://www.samsyn.is/), [Sensa](https://sensa.is/) and [Stokkur](https://stokkur.is/).

The project was made better with consulting from [Digido](https://digido.is/), [Magga Dóra](https://www.mennsk.is/), [Svavar Ingi Hermannsson](https://www.security.is/) and [Syndis](https://www.syndis.is/).

All respective parties gave their work to this project.

### Do you accept contributions?

We'll gladly accept contributions. Check out the issues for places to start.

### Is the app secure?

We have reviewed the code multiple time and received security audits from third party vendors. However, there is no such thing as 100% security.

If you believe you’ve found a security vulnerability, please send it to us by emailing security@aranja.com. Please include the following details with your report:

* Description of the location and potential impact of the vulnerability.
* A detailed description of the steps required to reproduce the vulnerability (POC scripts, screenshots, and compressed screen captures are all helpful to us).

Please practice Responsible Disclosure and give us sufficient time to deploy a fix to our users. 
