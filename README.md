# hexarch
Hexarch is an hexagonal architecture generator for vue. It helps to create files and folders following hexagonal architecture and screaming architecture given a domain name.

## Global installation

Run the following command to install the package globally:
```bash
npm i @danrdzprz/hexarch -g
```
### Usage

Run the following command in the root project folder to create the base structure:
```bash
hexarch domain -d [DomainName] -p [Attribute]:[Type],[OtherAttribute]:[OtherType]
```
Replace `[DomainName]` with the name of the domain. It's necessary for define the attributes, replace `[Attribute]` and `[Type]` with the domain attribute and the type respectively( at the end there is a list with all supported list of types ). In order to add as many attributes as you need, separate the attributes with coma `,`

### Example
```bash
hexarch domain -d Customer -p name:string,phone:number
```

## Local installation 

Run the following command to install the package in the project:
```bash
npm install @danrdzprz/hexarch --save-dev
```

Add the next line to package.json in scripts section 
```bash
"hexarch": "node ./node_modules/@danrdzprz/hexarch/dist/index.js"
```

### Usage

Run the following command in the root project folder to create the base structure:
```bash
npm run hexarch domain -- -d [DomainName] -p [Attribute]:[Type],[OtherAttribute]:[OtherType]
```
Replace `[DomainName]` with the name of the domain. It's necessary for define the attributes, replace `[Attribute]` and `[Type]` with the domain attribute and the type respectively( at the end there is a list with all supported list of types ). In order to add as many attributes as you need, separate the attributes with coma `,`

### Example
```bash
npm run hexarch domain -- -d Customer -p name:string,phone:number
```

### Options

- `-d`: Entity name
- `-p`: Attributes separated by comma ( , ) and needs define type with two dots ( : )

## Supported types
string, number, boolean, bigint, symbol, null, undefined, array, tuple, enum, interface, class, any, unknown, void, never, Blob