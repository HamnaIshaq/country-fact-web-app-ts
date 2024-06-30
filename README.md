# Country Fact Web App

## Introduction

The country fact website is an application that shows all countries to the user. The user can then filter a country using a country name or by region. This project idea and design is taken from [Front End Mentors - REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

This repo contains code that was existing in JavaScript and converted it into TypeScript.

## Technology used

- HTML
- SCSS
- TypeScript

## Converting JS to TS

- Install typescript using the following command:

```
  npm install -g typescript
```

- Create a tsconfig.json file inside the project by using the command:

```
  tsc init
```

- Configure the `tsconfig.json` file as needed like the following:

```js
  "outDir": "./dist" /* Specify an output folder for all emitted files */,
  "rootDir": "./js" /* Specify the root folder which contains source files */,
```

- Convert the `.js` files to `.ts` files.
- Fix the errors you encounter in the `.ts` files by adding types, interfaces etc.
- After doing all the changes, compile TypeScript into JavaScript using:

```
  tsc
```

- The above command will take all the TypeScript files from the root folder (specified in the `tsconfig.json` file) and compile all the TypeScript files into JavaScript files in the specified output/ destination folder. If the output folder does not already exists, then it will be created.

- Make sure to change the source attribute in the script tags in your HTML files to the compiled JavaScript files in the output folder like:

```html
<script src="dist/script.js"></script>
```

- Test your application
