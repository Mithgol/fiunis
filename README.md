This Node.js module is a decoder and an encoder of <b>Fi</b>donet <b>Uni</b>code <b>s</b>ubstrings.

It is called **Fiunis** after a hangman's pun “finis coronat opus” → “funis coronat opus” that appeared in Walter Scott's “[Quentin Durward](http://en.wikipedia.org/wiki/Quentin_Durward)” in 1823. (The word “string” sometimes also has the meaning “rope” or “cord”, equivalent to the Latin “funis”.)

This repository does also contain draft standards of **Fidonet Unicode substrings** for the Fidonet Global Hypertext Interface project.

* The [`fiunis.txt`](fiunis.txt) file is the English version of the draft.

* The [`fiunis.rus.txt`](fiunis.rus.txt) file is the Russian version of the draft. This version is provided in UTF-8 (for the diffs to look reasonably good on GitHub and other git tools) and thus should be converted to CP866 encoding (common in Russian Fidonet) before posting to Fidonet.

This module is a reference implementation of these standards, though partial (it implements only the decoder, not the encoder).

## Installing Fiunis

[![(npm package version)](https://nodei.co/npm/fiunis.png?downloads=true)](https://npmjs.org/package/fiunis) [![(a histogram of downloads)](https://nodei.co/npm-dl/fiunis.png?months=3)](https://npmjs.org/package/fiunis)

* Latest packaged version: `npm install fiunis`

* Latest githubbed version: `npm install https://github.com/Mithgol/fiunis/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/fiunis#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using Fiunis

When you `require()` the installed module, you get an object that has the following methods:

### decode(text)

Replaces all occurrences of Fidonet Unicode substrings in the given text by their decoded Unicode equivalents.

For example, `.decode('The video “&+mAJcFlwNbHpOS3p/iTJbUHvH;” is interesting.')` returns `'The video “頂尖對決之穿褲子篇” is interesting.'`.

### encode(text)

Returns the Fidonet Unicode substring equivalent of the given text.

For example, `.encode('頂尖對決之穿褲子篇')` returns `'&+mAJcFlwNbHpOS3p/iTJbUHvH;'`.

Any given text is converted (including ASCII characters). You should detect (beforehand) which substrings should be given to this encoder and what other substrings would be left to a traditional 8-bit encoding.

## Testing Fiunis

[![(build testing status)](https://travis-ci.org/Mithgol/fiunis.svg?branch=master)](https://travis-ci.org/Mithgol/fiunis)

The tests are not included in the npm package of the module (to keep it small). Use the version from GitHub.

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of Fiunis).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of Fiunis).

After that you may run `npm test` (in the directory of Fiunis).

## License

Distribution of the standards of Fidonet Unicode substrings is unlimited (see section 1), provided that the text is not altered without notice.

The rest of the repository is MIT-licensed (see the `LICENSE` file).
