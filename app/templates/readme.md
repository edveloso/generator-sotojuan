# <%= moduleName %>

[![Build Status](https://travis-ci.org/<%= githubUsername %>/<%= moduleName %>.svg?branch=master)](https://travis-ci.org/<%= githubUsername %>/<%= moduleName %>)

> My <%= superb %> module

## Install

```
$ npm install --save <%= moduleName %>
```

## Usage

```js
const <%= camelModuleName %> = require('<%= moduleName %>')

<%= camelModuleName %>('Juan')
// => 'I am cool - Juan'
```

## API

### <%= camelModuleName %>([input])

#### input

Type: `string`

Lorem ipsum.<% if (cli) { %>

## CLI

```
$ npm install --global <%= moduleName %>
```

```
$ <%= moduleName %> --help

  Usage
    <%= moduleName %> [input]

  Examples
    $ <%= moduleName %>
    I am cool - Juan
    $ <%= moduleName %> Jennifer
    I am cool - Jennifer
```<% } %>

## License

MIT © [<%= name %>](<%= website %>)
