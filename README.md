radiole
-------
radiole app allows user to monitor playlists from Spotify and get email notification when new tracks added. 

Features
--------
The UI has two sections showing featured and user playlists from Spotify. Any number of playlists can be selected to watch for new tracks. User will receive daily/weekly (based on preference) email update on newly added tracks.

![alt tag](https://raw.githubusercontent.com/amitava82/radiole/master/screenshot.png)


Technology
----------
radiole is a full stack javascript app built on Nodejs backend and React for frontend.
- **Backend**: NodeJS, MongoDB, Redis
- **Scheduling**: [Agenda](https://github.com/rschmukler/agenda/)
- **Email**: Sendgrid
- **UI**: React+Redux, React router, normalizr, SCSS
- **Build**: Grunt, webpack
- **Others**: babel for ES6 transpiler


Quick start
-----------
You must have MongoDB, Redis instance running. You also need spotify api access and app created. Check out https://developer.spotify.com. Clone the repo then change configs in `config/default.json`

    npm install
    bower install

Build React package

    webpack

Build css

    grunt css

Run the Scheduler engine:

    node engine/index.js

Run the web server

    node app.js

Open url based on the config to load the UI

TODO
----
- Polish up UI, responsive
- Email templates
- Additional features to preview tracks, open spotify app etc for better UX

License
-------
This project is licensed under the MIT license, Copyright (c) 2016 Amitava Saha. For more information see LICENSE.md.