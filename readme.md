# My OwnLocal Application

> Author: Brandtley McMinn
> Github: https://github.com/bmcminn

_*Quick note for anyone reviewing this source:* Due to the `crossorigin` limitations with the provided AWS API endpoints, this application utilizes a simple HTTP server as a proxy handler via cURL. You may review `bin/serve.js` to see how this works._



## Requirements

```
Node: v5.0.0+
cURL: 7.40.x+
```


### For Windows users:

**_NOTE_: Windows users should install cURL if you don't already have it in your system path.**

I would recommend installing [GOW (GNU on Windows)](https://github.com/bmatzelle/gow/releases) if you haven't already, which provides some *nix-y type CLI commands to the native windows console.

If you are unsure you have cURL installed on your machine, enter the command `curl --help` into your terminal app of choice and see whether it lists all available cURL commands or errors out.

To install, just download the `.zip` file for your Windows flavor from the following URL, and add the resulting `curl.dll` file to a folder that exists in your `PATH` environment.

Download: [https://curl.haxx.se/download.html#Win64](https://curl.haxx.se/download.html#Win64)

Helpful install info: [http://stackoverflow.com/questions/9507353/](http://stackoverflow.com/questions/9507353/how-do-i-install-set-up-and-use-curl-on-a-windows#comment-12056538)



## Getting up and running

### Step 1: Clone the App and install dependencies

```bash
# navigate to wherever you like to clone remote git projects
cd path/to/github/projects/folder

# clone the repo down from Github
git clone https://github.com/bmcminn/ol ol-brandtley

# navigate into the newly created repo folder
cd ol-brandtley

# install Node dependencies
npm i
```


### Step 2: Configure the environment

Open the generated `.env` file that was created during the post install `bootstrap` process and change the following values:

```ini
# Flip flop these values to trigger production builds in webpack
NODE_ENV        = local         ; uncomment whichever you want
; NODE_ENV        = production  ; uncomment whichever you want

API_URL         = set this to the AWS API URL defined in the project spec sheet
USE_API_PROXY   = true          ; this should be true so our proxy handles our API calls correctly
```


### Step 3: Run the server and open the application in your browser

Start the local client server by opening a separate console instance and running the following command:

```
npm run serve
```

Now you can open the application in your browser at [http://localhost:8080](http://localhost:8080)

This application has been tested to work in either Chrome or Firefox.



## Environment configs

Certain aspects of the application and local server can be tweaked using the `.env` config file generated by the `npm run bootstrap` process.

| Property | Value | Description |
| ---      |---    |--- |
| `NODE_ENV` | `local` OR `production`   | Enables extra webpack optimizations for compiled assets |
| `API_URL` | `string|url`  | Url of the API server our local server proxy should target |
| `USE_API_PROXY` | `boolean (false)` | Tells the local server to enable the server proxy |



## Developing with this repo

All build processes are handled through NPM scripts, located in `package.json` and work as follows:

```bash
npm run postinstall     # Runs on post install and fires `bootstrap`, `css` `templates`, and `build` processes
npm run bootstrap       # Runs all bootstrapping procedures for scaffolding asset folders and generating our base `.env` file
npm run css             # Compiles our stylus assets into the application CSS
npm run templates       # Precompiles our Handlebars templates
npm run build           # Runs our webpack build process
npm run watch           # Watches file system for changes to JS, Stylus, and Handlebars assets and runs their respective process
npm run test            # Runs our test suite to validate our app modules function as intended
npm run serve           # Runs a node server instance to deliver the `public/index.html` file
npm run mocha           # A short hand for running Mocha test modules instead of installing Mocha globally
```
