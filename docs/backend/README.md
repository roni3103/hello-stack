# The Back End

## Overview

The backend (or API as we'll refer to sometimes) links our frontend to the database. Whenever the frontend needs to get data or store it in the database it must go through the API.

## Why and When

We just talked about how the API or backend is the link between our front end application and database buy why?

### Database Connection

We only want to connect to our database in out backend. After all if the front end connected directly to the database that would mean having to store the database login credential in the client where anyone can see them.

The backend code lives on a server and usually the only way to access it is usually by an API using HTTP. The code never gets seen making it a secure place to do things like connect to a database.

We can pass the users authentication details to the backend and for each user we can store what they can and can't do. The backend has the authority to then do as it pleases and its up to us to write the logic to say what each user should and shouldn't do. On the backend this logic can't be seen or tampered with which isn't the case for code on the front end.

### Hard Processing

Security plays a big part in why we have a backend but there's more to it than that. Sometimes we get some input that required allot of horsepower to process and get an answer for. When this happens we don't usually want to do this on the client as it may slow or even crash their browser.

On the backend we know exactly what specs our machines have and what they can handle. Every client can be different so now and then there comes a time where it it preferential to do this processing on the backend and return the result back once we're done processing.

An example may be that it take lots of computation to add a photo filter. The end user is only interested in the result so give it to the backend and let it respond with the result when its done.

## (How) API Endpoints

An API is a contract between your front end and backend. You define how your front end can manipulate or receive data and calculations from your backend which can get its data from a database or even other backend API services. As long as your front end and backend agree on how they pass information between each other all should work fine.

however its common and good practice to use some sort of standard when building this contract. REST is one example but there's many alternatives such as SOAP. We'll use REST in our stack as it's pretty simple to grasp but the idea of a common standard is the important part to take away.

## REST APIs

### CRUD Operations

CRUD is a common term that stands for create, read, update and destroy. Many APIs follow a convention of being able to make CRUD operations on resources.

#### Resources

Lets break that down so we can see exactly what that means. We'll start with the term "resources". This can be a thing your application deals with for example users. Many applications require you to sign-up as a user.

Applications will typically have many resources. An application that lets users create todo lists will have users, todo lists and todo items as resources. These would generally also be linked in a sense that a user has many todo lists and a todo list has many todo items.

#### Create

todo

#### READ

todo

#### Update

todo

#### Delete

todo

## Uploading Files

It's often the case you want to give users the ability to upload files. This can be documents for them to store, images to use as avatars or files to process.

In our backend we have a very basic example of handling an upload. Because the stack uses Node and Express there's quite a bit that is geared specifically to that so if your stack isn't Node + Express give it a Google as it's a fairly common task.

### Why The Backend Handles File Uploads

The title's the question and here's the answer. You can't get access to your servers disk directly from the front end. For that reason you need to create an API endpoint that (usually) accepts `multipart/form-data` requests from an upload form.

Allot of this comes down to security. That said once you have an API endpoint that lets a user upload files you will want to make sure nothing bad gets through. After all giving users the ability to put any file on your servers is a big no-no for obvious reasons.

Usually you'll protect yourself by only allowing signed up users to upload files so you can see who is trying to be malicious. Also you'll want to check the file before writing it to somewhere permanent that it is safe.

### What To Do With Files

Thats entirely up to you. If your application needs files from users to process it may be the case you can throw them out and not save them permanently once you're done with them. Or if you are storing them you may send them to be stored somewhere where you know disk space won't run out such as an Amazon S3 bucket.

### How To Implement

This is that part thats Node + Express specific so skip if that's not you.

In `index.js` we added a new route to handle uploads. This is any post request to `api/v1/upload`. There is one bit of middleware we use before we handle the upload with our own code. That middleware is [multer](https://github.com/expressjs/multer) which adds what Express doesn't have for handling multipart/form-data form submits.

By this point it will be quite apparent middleware for Express is a big thing. Express is by design the basics and anything you want to add should be done by middleware. This is either by adding your own or using some that is already written such as multer.

Once the request has went through the multer middleware we can call our own function to handle the request and the `req` object will be decorated with all sorts of extras to do with the file that was uploaded. Check out `backend/api/v1/upload.js` to see how we handle the file.

# Next

[The database](../database/README.md)
