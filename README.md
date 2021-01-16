# Are You R? / Audience Data

This project is a bit like politcalcompass or sixtriangles - allows for setting and answering of political-themed questions to determine an overall stance for the individual answering them. Tongue in cheek robot references.

## Use

You need the `firebase-config.json` file in `/src`! If you don't have it, ask Ivor for it! It's not in this repo because it's public! Any firebase-related errors are probably caused by this!

You need npm installed. [MacOS instructions](https://treehouse.github.io/installation-guides/mac/node-mac.html) / [Linux instructions](https://linuxconfig.org/install-npm-on-linux)

Develop locally with:

```bash
#install dependencies
npm install
#run in dev mode
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Live site is [here](https://rooftop-audience-data.web.app/).
Information about how the firestore database is set up can be found in [database-info](/database-info/).

## Documentation

This project uses:

- https://redux-toolkit.js.org/ Redux Toolkit (State management)
- https://github.com/prescottprue/redux-firestore Redux Firestore (State management)
- https://github.com/csfrequency/react-firebase-hooks React Firebase Hooks (State management)
- https://tailwindcss.com/ Tailwind (Styling)
- https://react-hook-form.com/ React Hook Form (Forms)
- https://reactrouter.com/ React Router (Routing)
- https://tonejs.github.io/ - Tonejs (Audio)

## Deploy

```bash
npm run deploy
#runs firebase deploy, but you would need firebase CLI logged in as Ivor, so don't need to deploy.
```

## API

There will be some kind of [public api](https://rooftop-audience-data.web.app/api).

## Notes on installation

If you don't have npm installed,
