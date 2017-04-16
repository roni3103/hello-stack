# Starting The App

Assuming you've cloned this repository the first thing we'll do is get the application running locally on your machine to make sure everything is working as it should.

## Prerequisits

This is a stack that revolves around JavaScript/Node so it is expected to have the following already setup:

* NodeJS and NPM (nvm is good for this)
* A modern browser (IE 5 simply won't do)

Since we're trying to setup a very basic stack that should be all you need as far as tooling goes.

## Database Setup

### Install & Run MongoDB

You'll want to get mongo DB running on your machine by [installing it](https://docs.mongodb.com/manual/).

Once installed on your machine mongo can be started with the `mongod` command. You'll want to start the database before you try and start the application as it will error out if it has no database to connect to when it starts.

## Application Setup

### Install Package Dependencies

The application repository includes all the source that makes up our application but like most applications ours depends on some other third party code to work. We don't check in these bits of code into our source control but instead describe what packages we need and what version they should be at.

We do this by adding this info to the **package.json** file. In there you'll see some details about this application along side the dependencies and versions required.

Run `npm install` within the root folder of this repository where the **package.json** file is and NPM will pull down our dependencies into a folder called **node_modules**.

### NPM Scripts

Inside the **package.json** file we also define a few scripts. These are shorhand comands for other terminal comands so we don't need to type as much to start our application.

Run `npm start` to start the application.

# Next

[The front end](frontend/README.md)