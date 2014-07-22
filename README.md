This Node.js module is a renderer of <b>Fi</b>donet <b>Uni</b>code <b>s</b>trings.

It is called **Fiunis** after a hangman's pun “finis coronat opus” → “funis coronat opus” that appeared in Walter Scott's “[Quentin Durward](http://en.wikipedia.org/wiki/Quentin_Durward)” in 1823.

## Installing Fiunis

[![(npm package version)](https://nodei.co/npm/fiunis.png?downloads=true)](https://npmjs.org/package/fiunis) [![(a histogram of downloads)](https://nodei.co/npm-dl/fiunis.png?months=3)](https://npmjs.org/package/fiunis)

* Latest packaged version: `npm install fiunis`

* Latest githubbed version: `npm install https://github.com/Mithgol/fiunis/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/fiunis#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Testing Fiunis

[![(build testing status)](https://travis-ci.org/Mithgol/fiunis.svg?branch=master)](https://travis-ci.org/Mithgol/fiunis)

The tests are not included in the npm package of the module (to keep it small). Use the version from GitHub.

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of Fiunis).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of Fiunis).

After that you may run `npm test` (in the directory of Fiunis).

## License

MIT license (see the `LICENSE` file).
