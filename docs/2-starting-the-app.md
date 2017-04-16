# Starting The App

Assuming you've cloned this repository the first thing we'll do is get the application running locally on your machine to make sure everything is working as it should.

## Install Package Dependencies

The application repository includes all the source that makes up out application but like most applications ours depends on some other third party code to work. We' don't check these bits of code but instead describe what packages we need and what version they should be at.

We do this by adding this info to the `package.json` file. In theres you'll see some details about this application along side the dependencies and versions.

Run `npm install` from the root folder of this repository where the *package.json* file is and NPM will pull down our dependencies into a folder called *node_modules*.

## NPM Scripts

Inside the *package.json* file we also define a few scripts.

Run `npm start` to start the application.
