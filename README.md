[![Build Status](https://travis-ci.org/bitpay/bitcore-website.svg)](https://travis-ci.org/bitpay/bitcore-website) [![Dependency Status](https://david-dm.org/bitpay/bitcore-website.svg)](https://david-dm.org/bitpay/bitcore-website) [![devDependency Status](https://david-dm.org/bitpay/bitcore-website/dev-status.svg)](https://david-dm.org/bitpay/bitcore-website#info=devDependencies) [![Stories in Ready](https://badge.waffle.io/bitpay/bitcore-website.png?label=ready&title=Ready)](https://waffle.io/bitpay/bitcore-website)

# Developing

```sh
$ npm install -g gulp
$ npm install
$ gulp serve
```

## Build

```sh
$ gulp
```

Build and optimize the site, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.

## Serve Production Build

```sh
$ gulp serve:dist
```

Serve the optimized and minified version of the site for local testing.

## Deploy to gh-pages

```sh
$ gulp deploy
```

This builds for production, then deploys the dist folder to gh-pages.

## Rebuild `generated` Markdown

```sh
$ gulp generate-markdown
```
