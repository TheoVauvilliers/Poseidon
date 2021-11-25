# Local installation

* Copy and paste this file `.env.dist` in `.env` => on linux/macOS `cp .env.dist .env`
* Run `docker-compose up -d`
* Run `docker ps` (1 container mongodb for database)
* Run `npm start`
* Go to `localhost:3000`

# Local - join Twitch API

* Go to `https://dev.twitch.tv/`
* Login with you twitch account
* Create new application
* Go to your new application
* Copy `Client ID` to paste is `TWITCH_CLIENT_ID` in you `.env` file
* Generate `Client secret` and copy/paste is `TWITCH_CLIENT_SECRET` in you `.env` file
