# maki 🐵🙈🙉🙊

This project is a template based on the approach I shared on linkedin [here](https://www.linkedin.com/pulse/modernizing-qa-solution-architecture-sustainable-do-van-khac-ygzyf%3FtrackingId=tvKQUbluR0qK%252Flqz9C%252FCcA%253D%253D/?trackingId=tvKQUbluR0qK%2Flqz9C%2FCcA%3D%3D). This project is based on Selenium 🤖 and cucumber 🥒.

Thanks to check the article if for more description 🥸.

If you want to know what Maki is... check [here](https://fr.wikipedia.org/wiki/L%C3%A9mur_catta).

# Required 🧰

- Node JS 
- some snacks and drink 🍟🧋

# Installation 🛰️

Well... it's node JS so we need it then npm i from the root folder 🤓

# How to run 🚀

I know most of time ppl want to run it before understanding the Architecture... Feel free to check package.json > scripts to see how to clean, build, start and what ```magic``` do XD.

# Architecture 🎡

Well, this is the main point in this project. If u had time to check the article I have shared on linkedin you gonna understand why this approach is better and more suitable for big project where time to market is very important.

Instead of having 1 script for each test for each market, means 2 same tests but for 2 different market need to have 2 scripts. Here 1 script is enough and the build will care automatically about the market / env target.

- index.js : contains the main logic for the build, choice your market / target and just run npm build. The script will create all steps definitions based on generic approach from config / properties folders and automatically add the methods you need in your steps def file. For sure, this is not magical, so you have to follow some pattern to be able to use this "little framework"

- scrpits: this folder contains all your feature file, follow gherkin standard but you have to specify the interface and method to use like below
```
  Scenario: google search website load correctly
    Given user use ~browserInterface~ to ~startBrowser~
    When use ~browserInterface~ to ~verifyTitle~ is 'Google'
    Then use ~browserInterface~ to ~closeBrowser~
```
browserInterface is the Interface you need and startBrowser is the method to open url.
> As you can see we don't provide any url, since the script is generic all specifics value for each market / env are stored in config / properties

- properties: here you define all specific and common selectors, xpath, url etc... Follow the pattern by putting all common stuff in common.properties.json and everything specific in <market>.properties.json like below

> fr.properties.json: some specific selectors based on env / market but can also contains API data for applicable for this specific env / market only. Only sky is the limit 🌁
```
{
    "url": "https://www.google.fr"
}
```

> common.properties.json: all selectors shared by all env / market
```
{
    "visualElements":{
        "imgs":{
            "logo": "img[alt='Google']"
        }
    },
    ...
```

- configs: here we set the build rules, capabilities for the browser and app.

> build.config.json contains the scope, what the script will build for a market is defined inside scope > marketName and interface is where you define which interface is needed for this script

```
{
    "scope": {
        "fr": ["openWebsite"],
        "uk": ["openWebsite", "searchForPresident"]
    },
    "interface":{
        "openWebsite": ["browser"],
        "searchForPresident": ["browser", "search"]
        
    }
}
```


> capabilities.config.json is everything about the driver and cucumber (list of all allowed keyword etc...). By default, cucumber will run all scripts inside "features" folder, if you want to change the targetFolder (used by build) you shall change the npx cucumber-js entry point.
```
{
    "browser": "chrome",
    "targetFolder": "features",
    "gherkinKeys": ["Given", "When", "Then", "And"]
}
```

- src: here we are... I guess we don't have to talk about what is utilities (I let you discover it 😝), let's start with the "core".

### Core 
is where you manipulate the main logic of your test, this is not where you click, open scroll NO! the main logic is something specific to your website / webapp, let's say you have to run 2 API call before you can start to scroll in the browser so this is where you do those logic (or also calculate taxes etc if you wanna use it for accounting).

### Interface
This is the "relation" between your feature file and the UI automation + Core logic... Your UI automation script is here.

# Example

If you run build, the default value is fr. 
The build script will generate a new folder (features) and copy all features file from the scripts folder FOR THIS MARKET ONLY (ref to build.config.json).

```
Feature: open Website

  Scenario: google search website load correctly
    Given user use ~browserInterface~ to ~startBrowser~
    When use ~browserInterface~ to ~verifyTitle~ is 'Google'
    Then use ~browserInterface~ to ~closeBrowser~
```

After the feature file, the build script will generate (based on mapping.config.json, build.config.json and capabilities.config.json) a js file with all Steps Definition.
```
// Code auto generated by Maki - Mon, 26 Feb 2024 12:48:18 GMT

import { Given, When, Then } from '@cucumber/cucumber';

import _commonProperties from '../../properties/common.properties.json' assert{type: "json"};
import _marketProperties from '../../properties/fr.properties.json' assert{type: "json"};

import { BrowserInterface } from '../../src/interfaces/BrowserInterface/index.js';

const browserInterface = new BrowserInterface({"browser":"chrome","targetFolder":"features","gherkinKeys":["Given","When","Then","And"]}, "fr", {"common": _commonProperties, "market": _marketProperties});

Given("user use ~browserInterface~ to ~startBrowser~", async () => { awaitbrowserInterface.startBrowser(); });
When("use ~browserInterface~ to ~verifyTitle~ is {string}", async (arg_0) => { awaitbrowserInterface.verifyTitle(arg_0); });
Then("use ~browserInterface~ to ~closeBrowser~", async () => { awaitbrowserInterface.closeBrowser(); });
```

And that's it... if you change the site_target to uk (package.json > scripts > build), you will get uk and 1 more steps.js file since we have 2 scenarios for uk and only 1 for fr
```
site_target=uk node index.js
```
