# Starting The App

Assuming you've cloned this repository the first thing we'll do is get the application running locally on your machine to make sure everything is working as it should.

## Database Setup

### Install & Run MongoDB

You'll want to get mongo DB running on your machine. One options is to [install it](https://docs.mongodb.com/manual/].

Once installed on your machine mongo can be started with the `mongod` command. You'll want to start the database before you try and start the application as it will error out if it has no database to connect to when it starts.

## Application Setup

### Install Package Dependencies

The application repository includes all the source that makes up out application but like most applications ours depends on some other third party code to work. We' don't check these bits of code but instead describe what packages we need and what version they should be at.

We do this by adding this info to the `package.json` file. In theres you'll see some details about this application along side the dependencies and versions.

Run `npm install` from the root folder of this repository where the *package.json* file is and NPM will pull down our dependencies into a folder called *node_modules*.

### NPM Scripts

Inside the *package.json* file we also define a few scripts.

Run `npm start` to start the application.

# Next

[The front end](frontend/README.md)