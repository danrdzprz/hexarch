# hexarch
Hexarch is an hexagonal architecture generator for vue.

## Global installation ( suggested )

* npm i @danrdzprz/hexarch -g

## Command

```bash
# Execute in root project
$ hexarch domain -d NameEntity -p attr1:string,attr2:number

```

## Local installation 

* npm install @danrdzprz/hexarch --save-dev
* Add the next line to package.json in scripts section => "hexarch": "node ./node_modules/@danrdzprz/hexarch/dist/index.js"


## Command

```bash
# Execute in root project
$ npm run hexarch domain -- -d Test -p name:string,number:number

```

## Options

- `-d`: Entity name
- `-p`: Attributes separated by coma ( , ) and needs define type with two dots ( : )

## Supported types
* string|number|boolean|bigint|symbol|null|undefined|array|tuple|enum|interface|class|any|unknown|void|never|Blob
