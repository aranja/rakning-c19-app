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

### Documents

* [System Architecture](https://docs.google.com/presentation/d/1SxGX7pXXMBcO2h7iYRRWI2Ru1oHRV19hZqU2RFYlXK4)
