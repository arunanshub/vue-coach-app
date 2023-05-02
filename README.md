# Coach App

This chronicle bears witness to my earnest quest to attain erudition and
mastery in the art of Vue.js and all its appurtenant parts, machinations,
and complexities.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Configuration Variables

These are the required configuration variables required by Coach App. These
must be configured in `.env` file.

Sure, here's the documentation for the config vars you mentioned:

- `VITE_FIREBASE_API_KEY`: This is the API key for your Firebase project.
  It is used to authenticate requests made from your app to Firebase services,
  such as the Realtime Database or Cloud Storage.

- `VITE_FIREBASE_AUTH_DOMAIN`: This is the domain of your Firebase Authentication
  service. It is used to authenticate users who sign in to your app using Firebase
  Authentication.

- `VITE_FIREBASE_DATABASE_URL`: This is the URL of your Firebase Realtime Database.
  It is used to access and store data in your database.

- `VITE_FIREBASE_PROJECT_ID`: This is the ID of your Firebase project. It is used to
  identify your project when making requests to Firebase services.

- `VITE_FIREBASE_STORAGE_BUCKET`: This is the name of your Firebase Cloud Storage bucket.
  It is used to store and retrieve files in your storage bucket.

- `VITE_FIREBASE_MESSAGE_SENDER_ID`: This is the ID of your Firebase Cloud Messaging sender.
  It is used to send push notifications to users who have subscribed to receive them.

- `VITE_FIREBASE_APP_ID`: This is the ID of your Firebase app. It is used to identify your
  app when making requests to Firebase services.
