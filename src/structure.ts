
import * as fs from 'fs-extra';
import * as path from 'path';
import * as prompts from 'prompts';
import { ParametersEntity } from './types';
import { fillTemplate } from './replace';
import { toKebabCase } from './identifier-case-styles';

export const createStructure = async (domain_name: string, parameters: ParametersEntity[], key_name = 'id', key_type = 'string')=> {
    

    const baseDir = path.join(process.cwd(),'src/data');

    const application_folder =  `core/${domain_name}/application`;
    const dto_folder =  `${application_folder}/dto`;
    const services_folder =  `${application_folder}/services`;
    const use_cases_folder =  `${application_folder}/use_cases`;
    const domain_folder =  `core/${domain_name}/domain`;
    const entities_folder =  `${domain_folder}/entities`;
    const contracts_folder =  `${domain_folder}/contracts`;
    const infrastructure_folder =  `core/${domain_name}/infrastructure`;
    const shared_domain_folder =  `shared/domain`;

    const structure = [
        'core',
        application_folder,
        domain_folder,
        entities_folder,
        contracts_folder,
        infrastructure_folder,
        shared_domain_folder,
        dto_folder,
        services_folder,
        use_cases_folder,
    ];

    structure.forEach(dir => {
        const fullPath = path.join(baseDir, dir);
        fs.ensureDirSync(fullPath);
        console.log(`📂 Folder created: ${fullPath}`);
    });

    await domainLayer(domain_name, parameters, contracts_folder, entities_folder, baseDir, shared_domain_folder, key_name, key_type);
    await applicationLayer(domain_name, use_cases_folder, baseDir, key_name, key_type);

    const detail_template = fs.readFileSync('src/templates/repository.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, infrastructure_folder, `api-${toKebabCase(domain_name)}-repository.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, detail_template)
    );
    console.log(`📄 Api  ${domain_name} repository created `);

}

function applicationLayer(domain_name: string, use_cases_folder: string, baseDir: string, key_name: string, key_type: string){
    const create_template = fs.readFileSync('src/templates/case_uses/create-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `create-${toKebabCase(domain_name)}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
        }, create_template)
    );
    console.log(`📄 Create use case ${domain_name} created `);

    const list_template = fs.readFileSync('src/templates/case_uses/list-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `list-${toKebabCase(domain_name)}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
        }, list_template)
    );
    console.log(`📄 List use case ${domain_name} created `);

    const delete_template = fs.readFileSync('src/templates/case_uses/delete-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `delete-${toKebabCase(domain_name)}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, delete_template)
    );
    console.log(`📄 Delete use case ${domain_name} created `);

    const update_template = fs.readFileSync('src/templates/case_uses/update-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `update-${toKebabCase(domain_name)}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, update_template)
    );
    console.log(`📄 Update use case ${domain_name} created `);

    const detail_template = fs.readFileSync('src/templates/case_uses/detail-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `detail-${toKebabCase(domain_name)}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, detail_template)
    );
    console.log(`📄 Detail use case ${domain_name} created `);
}



async function domainLayer(domain_name: string, parameters: ParametersEntity[], contracts_folder: string, entities_folder: string, baseDir: string, shared_domain_folder: string, key_name: string, key_type: string){
    //shared
    const crud_actions = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Would you like to create CRUD actions:'
    });

    const confirm_curd_actions = crud_actions.confirm as boolean;
    
    const shared_files =[
        {name:'ResponseSuccess.ts' , url: 'src/templates/shared/ResponseSuccess.ts'},
        {name:'ResponseFailure.ts' , url: 'src/templates/shared/ResponseFailure.ts'},
    ];

    if(confirm_curd_actions){
        const pagination = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: 'Has it pagination server side ?'
        });
        const confirm_pagination = pagination.confirm as boolean;
        if(confirm_pagination){
            shared_files.push({name: 'PaginationCollection.ts', url: 'src/templates/shared/PaginationCollection.ts'});
            shared_files.push({name: 'PaginationOptions.ts', url: 'src/templates/shared/PaginationOptions.ts'});
        }
    }

    shared_files.forEach( x => {
        fs.writeFileSync(path.join(baseDir, shared_domain_folder, `${x.name}`), fs.readFileSync(x.url, 'utf-8'));
        console.log(`📄 Entity ${x.name} created `);
    })  
    //create entities
    let entity_file = `export interface ${domain_name} \n{\n`
    entity_file+=`\tid:number;\n`;
    parameters.forEach( x => {
        entity_file+=`\t${x.name}:${x.type};\n`;
    });
    entity_file+=`}\n`;
    fs.writeFileSync(path.join(baseDir, entities_folder, `${domain_name}.ts`), entity_file);
    console.log(`📄 Entity ${domain_name} created `);

    // update
    const update_template = fs.readFileSync('src/templates/entities/UpdateEntity.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, entities_folder, `Update${domain_name}.ts`), fillTemplate({
            domain_name: domain_name
        }, update_template)
    );
    console.log(`📄 Update Entity ${domain_name} Updated `);
    
    // create
    const create_template = fs.readFileSync('src/templates/entities/CreateEntity.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, entities_folder, `Create${domain_name}.ts`), fillTemplate({
            domain_name: domain_name
        }, create_template)
    );
    console.log(`📄 Create Entity ${domain_name} created `);

    // detail
    const detail_template = fs.readFileSync('src/templates/entities/DetailEntity.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, entities_folder, `Detail${domain_name}.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, detail_template)
    );
    console.log(`📄 Detail Entity ${domain_name} created `);

    // list
    const list_template = fs.readFileSync('src/templates/entities/ListEntity.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, entities_folder, `List${domain_name}.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, list_template)
    );
    console.log(`📄 List Entity ${domain_name} created `);
    

    //create contracts
    const contract_template = fs.readFileSync('src/templates/RepositoryContract.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, contracts_folder, `${domain_name}RepositoryContract.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, contract_template)
    );
    console.log(`📄 Contract ${domain_name} created `);
}



function infrastructureLayer(){
    
}