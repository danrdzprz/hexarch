
import * as fs from 'fs-extra';
import * as path from 'path';
import * as prompts from 'prompts';
import { ParametersEntity } from './types';
import { fillTemplate } from './replace';
import { toKebabCase, toUpperSnakeCase } from './identifier-case-styles';

export const createStructure = async (domain_name: string, parameters: ParametersEntity[], key_name = 'id', key_type = 'number')=> {
    

    const baseDir = path.join(process.cwd(),'src/modules');

    const main_domain_folder = toKebabCase(domain_name)
    const application_folder =  `core/${main_domain_folder}/application`;
    const dtos_folder =  `${application_folder}/dtos`;
    const services_folder =  `${application_folder}/services`;
    const use_cases_folder =  `${application_folder}/use_cases`;
    const domain_folder =  `core/${main_domain_folder}/domain`;
    const entities_folder =  `${domain_folder}/entities`;
    const contracts_folder =  `${domain_folder}/contracts`;
    const infrastructure_folder =  `core/${main_domain_folder}/infrastructure`;
    const infrastructure_repositories_folder =  `${infrastructure_folder}/repositories`;
    const shared_domain_folder =  `shared/domain`;
    const shared_domain_dtos_folder =  `shared/application/dtos`;
    const shared_domain_entities_folder =  `shared/domain/entities`;
    const store_folder =  `core/${main_domain_folder}/stores`;
    const validations_folder =  `core/${main_domain_folder}/validations`;

    const structure = [
        'core',
        application_folder,
        domain_folder,
        entities_folder,
        dtos_folder,
        contracts_folder,
        infrastructure_folder,
        shared_domain_folder,
        shared_domain_dtos_folder,
        services_folder,
        use_cases_folder,
        store_folder,
        infrastructure_repositories_folder,
        shared_domain_entities_folder,
        validations_folder
    ];

    structure.forEach(dir => {
        const fullPath = path.join(baseDir, dir);
        fs.ensureDirSync(fullPath);
        console.log(`📂 Folder created: ${fullPath}`);
    });

    await domainLayer(domain_name, parameters, contracts_folder, entities_folder, baseDir, shared_domain_entities_folder, key_name, key_type);
    await applicationLayer(domain_name, use_cases_folder, baseDir,dtos_folder, key_name, key_type);

    const repository = fs.readFileSync('src/templates/repository.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, infrastructure_repositories_folder, `api-${main_domain_folder}-repository.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, repository)
    );
    console.log(`📄 Api  ${domain_name} repository created `);

    //stores
    const create = fs.readFileSync('src/templates/stores/create.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `create-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
        }, create)
    );
    console.log(`📄 Store to create ${domain_name} created `);

    const update = fs.readFileSync('src/templates/stores/update.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `update-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
            key_type: key_type,
            key_name: key_name,
        }, update)
    );
    console.log(`📄 Store to create ${domain_name} update `);

    const remove = fs.readFileSync('src/templates/stores/delete.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `delete-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
            key_type: key_type,
            key_name: key_name,
        }, remove)
    );
    console.log(`📄 Store to create ${domain_name} remove`);

    const detail = fs.readFileSync('src/templates/stores/detail.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `detail-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
            key_type: key_type,
            key_name: key_name,
        }, detail)
    );
    console.log(`📄 Store to create ${domain_name} detail`);

    const list = fs.readFileSync('src/templates/stores/list.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `list-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
        }, list)
    );
    console.log(`📄 Store to create ${domain_name} list`);

}

function applicationLayer(domain_name: string, use_cases_folder: string, baseDir: string, dtos_folder:string, key_name: string, key_type: string){
    const main_domain_folder = toKebabCase(domain_name);

    const create_template = fs.readFileSync('src/templates/case_uses/create-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `create-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
        }, create_template)
    );
    console.log(`📄 Create use case ${domain_name} created `);

    const list_template = fs.readFileSync('src/templates/case_uses/list-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `list-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
        }, list_template)
    );
    console.log(`📄 List use case ${domain_name} created `);

    const delete_template = fs.readFileSync('src/templates/case_uses/delete-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `delete-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, delete_template)
    );
    console.log(`📄 Delete use case ${domain_name} created `);

    const update_template = fs.readFileSync('src/templates/case_uses/update-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `update-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, update_template)
    );
    console.log(`📄 Update use case ${domain_name} created `);

    const detail_template = fs.readFileSync('src/templates/case_uses/detail-use-case.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `detail-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, detail_template)
    );
    console.log(`📄 Detail use case ${domain_name} created `);

    // dtos
    const update_dto = fs.readFileSync('src/templates/dtos/UpdateDto.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `Update${domain_name}.ts`), fillTemplate({
            domain_name: domain_name
        }, update_dto)
    );
    console.log(`📄 Update Dto ${domain_name} Updated `);
    
    // create
    const create_dto = fs.readFileSync('src/templates/dtos/CreateDto.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `Create${domain_name}.ts`), fillTemplate({
            domain_name: domain_name
        }, create_dto)
    );
    console.log(`📄 Create Dto ${domain_name} created `);

    // detail
    const detail_dto = fs.readFileSync('src/templates/dtos/DetailDto.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `Detail${domain_name}.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, detail_dto)
    );
    console.log(`📄 Detail Dto ${domain_name} created `);

    // list
    const list_dto = fs.readFileSync('src/templates/dtos/ListDto.txt', 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `List${domain_name}.ts`), fillTemplate({
            domain_name: domain_name,
            key_type: key_type,
            key_name: key_name,
        }, list_dto)
    );
    console.log(`📄 List Dto ${domain_name} created `);
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
        {name:'ResponseSuccess.ts' , url: 'src/templates/shared/domain/entities/ResponseSuccess.ts'},
        {name:'ResponseFailure.ts' , url: 'src/templates/shared/domain/entities/ResponseFailure.ts'},
    ];

    if(confirm_curd_actions){
        const pagination = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: 'Has it pagination server side ?'
        });
        const confirm_pagination = pagination.confirm as boolean;
        if(confirm_pagination){
            shared_files.push({name: 'PaginationCollection.ts', url: 'src/templates/shared/domain/entities/PaginationCollection.ts'});
            shared_files.push({name: 'PaginationOptions.ts', url: 'src/templates/shared/domain/entities/PaginationOptions.ts'});
        }
    }

    shared_files.forEach( x => {
        fs.writeFileSync(path.join(baseDir, shared_domain_folder, `${x.name}`), fs.readFileSync(x.url, 'utf-8'));
        console.log(`📄 Entity ${x.name} created `);
    })  
    //entity
    //main entity
    let entity_file = `export interface ${domain_name} \n{\n`
    entity_file+=`\tid: number;\n`;
    parameters.forEach( x => {
        entity_file+=`\t${x.name}: ${x.type};\n`;
    });
    entity_file+=`}\n`;
    fs.writeFileSync(path.join(baseDir, entities_folder, `${domain_name}.ts`), entity_file);
    console.log(`📄 Entity ${domain_name} created `);
    //detail entity
    // const detail_entity = fs.readFileSync('src/templates/entities.txt', 'utf-8');
    // fs.writeFileSync(path.join(baseDir, contracts_folder, `Detail${domain_name}.ts`), fillTemplate({
    //         domain_name: domain_name,
    //         key_type: key_type,
    //         key_name: key_name,
    //     }, detail_entity)
    // );

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