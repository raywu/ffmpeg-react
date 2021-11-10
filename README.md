# ffmpeg-react

[How To Build a Media Processing API in Node.js With Express and FFmpeg.wasm](https://www.digitalocean.com/community/tutorials/how-to-build-a-media-processing-api-in-node-js-with-express-and-ffmpeg-wasm) (published October 15, 2021) is the main inspiration for this project. I translated vanilla JS cilent into a React implementation, to point to the Express [FFMpeg WASM](https://ffmpegwasm.netlify.app/) server.

[How to make GIFs with FFMPEG](https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/) (published March 29, 2018) has some neat tricks on FFmpeg.

[How to Set up a Node.js Express Server for React](https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/) (April 15, 2021) is the quick start up guide to set up React client and Express Server.

# React Client

To start the server, do the following at root directory

```
$ cd client
$ npm start
```

# Express Server

To start the server, do the following at root directory

```
$ node --experimental-modules --experimental-wasm-threads server.mjs
```

+ `--experimental-modules` is to support *.mjs
+ `--experimental-wasm-threads` is to support WASM; as off Node.js v16.11.0, WebAssembly threads remain behind a flag in case there might be changes before the proposal is finalized (according to [this](https://www.digitalocean.com/community/tutorials/how-to-build-a-media-processing-api-in-node-js-with-express-and-ffmpeg-wasm))
+ if you’re running Node.js 15 or lower, add `--experimental-wasm-bulk-memory`, too

# Dependencies

+ Node.js: v16.13.0
+ npm: 8.1.0