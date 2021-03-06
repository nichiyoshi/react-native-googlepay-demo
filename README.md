# react-native-googlepay-demo
Google Pay sample for React Native App

![demo_](https://user-images.githubusercontent.com/40135056/48977139-eecf5480-f0d7-11e8-9098-6ef09f970961.gif)

Since [react-native-payments](https://github.com/naoufal/react-native-payments) does not support `Google Pay`, I made an demo app to show how to write native code and use it.

I am newbie and I don't have much time to complete this as library or make PR to react-native-payments.

I hope this demo can at least give you ideas on how to integrate Google Pay to your app.

## Functions

This app only have **two functions.**

### 1. Check if this app and device can use Google Pay

By **"Check if Google Pay os available"**  button, you can find out if Google Pay is available.
If available, "Pay with Google Pay" button will be enabled, otherwise this button is disabled.

### 2. Request Google Pay and get token

By tapping **"Pay with Google Pay "**, you can procceed to get token which is supposed to be passed to your gateway merchant.



that's all, it's very simple.

## Limitation

### only gateway, not direct
**The payment tokenization method** used in this app is **only gateway**.

## Reference
- [Google Pay API](https://developers.google.com/pay/api/android/guides/setup)
- [React Native - Native Modules](https://facebook.github.io/react-native/docs/native-modules-android)
- [React Native - Native Components](https://facebook.github.io/react-native/docs/native-components-android)
- [react-native-payments](https://github.com/naoufal/react-native-payments)
