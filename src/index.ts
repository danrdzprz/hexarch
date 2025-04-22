#!/usr/bin/env ts-node
import { program } from 'commander';
import { createStructure } from './structure';
import { attributes_separator, ParametersEntity, type_regular_expression, type_separator, typesString } from './types';
import { toPascalCase } from './identifier-case-styles';

program
  .name('domain-generator')
  .description('Create structure')
  .version('0.1.9');

program
    .command('domain')
    .description('Create structure of files and folder for an specific domain name')
    .requiredOption('-d, --domain <string>', 'Name of domain')
    .option('-p, --parameters <string>', 'Parameters')
    .action((str, options) => {
        console.log(str);
        if (!str.domain) {
            console.error('Por favor, el nombre del dominio.');
            process.exit(1);
        }
        const parameters : ParametersEntity[] = [];
        if(str.parameters){
            const ok = type_regular_expression.exec(str.parameters);
            if(! ok ){
                console.error('Properties must follow the next structure: prop1:type1,prop2:type2');
                console.error(`The allowed types are ${typesString}`);
                process.exit(1);
            }
            (str.parameters as string).split(attributes_separator).forEach(
                x => {
                    const [name, type] = x.split(type_separator);

                    parameters.push({
                        name: name,
                        type: type
                    })
                }
            )
        }
        const domain_name = toPascalCase(str.domain);
        createStructure(domain_name, parameters)
    });


program.parse(process.argv);
// const options = program.opts();
// console.log(options);
// if (!options.domain) {
//     console.error('Por favor, el nombre del dominio.');
//     process.exit(1);
// }

// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));

// createStructure();
//example
//npm run start -- User valor2
//npm run start domain -- -d User  