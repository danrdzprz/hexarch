
import * as fs from 'fs-extra';
import * as path from 'path';
import * as prompts from 'prompts';
import { ParametersEntity } from './types';
import { fillTemplate } from './replace';
import { toKebabCase, toUpperSnakeCase } from './identifier-case-styles';
import { fileExists } from './storage';

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

    const pagination = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Has it pagination server side?'
    });
    const confirm_pagination = pagination.confirm as boolean;

    await domainLayer(domain_name, parameters, contracts_folder, entities_folder, baseDir, shared_domain_entities_folder, key_name, key_type, confirm_pagination);
    await applicationLayer(domain_name, use_cases_folder, baseDir,dtos_folder, key_name, key_type, confirm_pagination);
    await infrastructureLayer( domain_name, infrastructure_repositories_folder, baseDir, key_name, key_type, confirm_pagination );

    const stores_question = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Would you like to add stores files?'
    });
    const confirm_stores = stores_question.confirm as boolean;
    if(confirm_stores){
        await stores( domain_name, store_folder, baseDir, key_name, key_type, confirm_pagination );
    }

}

function applicationLayer(domain_name: string, use_cases_folder: string, baseDir: string, dtos_folder:string, key_name: string, key_type: string, confirm_pagination: boolean){
    const main_domain_folder = toKebabCase(domain_name);

    const create_template = fs.readFileSync( path.join(__dirname, '../templates/case_uses/create-use-case.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `create-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
        }, create_template)
    );
    console.log(`📄 Create use case ${domain_name} created `);

    if( confirm_pagination ){
        const list_template = fs.readFileSync( path.join(__dirname, '../templates/case_uses/list-use-case-pagination.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, use_cases_folder, `list-${main_domain_folder}-use-case.ts`), fillTemplate({
                domain_name: domain_name,
                domain_file: main_domain_folder,
            }, list_template)
        );
    }else{
        const list_template = fs.readFileSync( path.join(__dirname, '../templates/case_uses/list-use-case.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, use_cases_folder, `list-${main_domain_folder}-use-case.ts`), fillTemplate({
                domain_name: domain_name,
                domain_file: main_domain_folder,
            }, list_template)
        );
    }

    console.log(`📄 List use case ${domain_name} created `);

    const delete_template = fs.readFileSync( path.join(__dirname, '../templates/case_uses/delete-use-case.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `delete-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
            key_type: key_type,
            key_name: key_name,
        }, delete_template)
    );
    console.log(`📄 Delete use case ${domain_name} created `);

    const update_template = fs.readFileSync( path.join(__dirname, '../templates/case_uses/update-use-case.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `update-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
            key_type: key_type,
            key_name: key_name,
        }, update_template)
    );
    console.log(`📄 Update use case ${domain_name} created `);

    const detail_template = fs.readFileSync( path.join(__dirname, '../templates/case_uses/detail-use-case.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, use_cases_folder, `detail-${main_domain_folder}-use-case.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
            key_type: key_type,
            key_name: key_name,
        }, detail_template)
    );
    console.log(`📄 Detail use case ${domain_name} created `);

    // dtos
    const update_dto = fs.readFileSync( path.join(__dirname, '../templates/dtos/update-dto.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `update-${main_domain_folder}.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
        }, update_dto)
    );
    console.log(`📄 Update Dto ${domain_name} Updated `);
    
    // create
    const create_dto = fs.readFileSync( path.join(__dirname, '../templates/dtos/create-dto.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `create-${main_domain_folder}.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
        }, create_dto)
    );
    console.log(`📄 Create Dto ${domain_name} created `);

    // detail
    const detail_dto = fs.readFileSync( path.join(__dirname, '../templates/dtos/detail-dto.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `detail-${main_domain_folder}.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
            key_type: key_type,
            key_name: key_name,
        }, detail_dto)
    );
    console.log(`📄 Detail Dto ${domain_name} created `);

    // list
    const list_dto = fs.readFileSync( path.join(__dirname, '../templates/dtos/list-dto.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, dtos_folder, `list-${main_domain_folder}.ts`), fillTemplate({
            domain_name: domain_name,
            domain_file: main_domain_folder,
            key_type: key_type,
            key_name: key_name,
        }, list_dto)
    );
    console.log(`📄 List Dto ${domain_name} created `);
}



async function domainLayer(domain_name: string, parameters: ParametersEntity[], contracts_folder: string, entities_folder: string, baseDir: string, shared_domain_folder: string, key_name: string, key_type: string, confirm_pagination: boolean){
    //shared
    const main_domain_folder = toKebabCase(domain_name);

    const shared_files =[
        {name:'request-status.ts' , url: '../templates/shared/domain/entities/request-status.md'},
        {name:'response-success.ts' , url: '../templates/shared/domain/entities/response-success.md'},
        {name:'response-failure.ts' , url: '../templates/shared/domain/entities/response-failure.md'},
    ];
        
    if(confirm_pagination){
        shared_files.push({name: 'pagination-collection.ts', url: '../templates/shared/domain/entities/pagination-collection.md'});
        shared_files.push({name: 'pagination-options.ts', url: '../templates/shared/domain/entities/pagination-options.md'});
    }

    shared_files.forEach( async x => {
        const file_path = path.join(baseDir, shared_domain_folder, `${x.name}`);
        if(! await fileExists(file_path)){
            fs.writeFileSync(file_path, fs.readFileSync( path.join(__dirname, x.url ), 'utf-8'));
            console.log(`📄 Entity ${x.name} created `);
        }else{
            console.log(`📄 Entity ${x.name} is already exist. `);
        }
    })  
    //entity
    //main entity
    let entity_file = `export interface ${domain_name} \n{\n`
    entity_file+=`\tid: number;\n`;
    parameters.forEach( x => {
        entity_file+=`\t${x.name}: ${x.type};\n`;
    });
    entity_file+=`}\n`;
    fs.writeFileSync(path.join(baseDir, entities_folder, `${main_domain_folder}.ts`), entity_file);
    console.log(`📄 Entity ${domain_name} created `);

    //create contracts
    if( confirm_pagination ){
        const contract_template = fs.readFileSync( path.join(__dirname, '../templates/repository-contract-pagination.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, contracts_folder, `${main_domain_folder}-repository-contract.ts`), fillTemplate({
                domain_name: domain_name,
                domain_file: main_domain_folder,
                key_type: key_type,
                key_name: key_name,
            }, contract_template)
        );
    }else{
        const contract_template = fs.readFileSync( path.join(__dirname, '../templates/repository-contract.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, contracts_folder, `${main_domain_folder}-repository-contract.ts`), fillTemplate({
                domain_name: domain_name,
                domain_file: main_domain_folder,
                key_type: key_type,
                key_name: key_name,
            }, contract_template)
        );
    }
    
    console.log(`📄 Contract ${domain_name} created `);
}



function infrastructureLayer(domain_name: string, infrastructure_repositories_folder: string, baseDir: string, key_name: string, key_type: string, confirm_pagination: boolean){
    const main_domain_folder = toKebabCase(domain_name);

    if( confirm_pagination ){
        const repository = fs.readFileSync( path.join(__dirname, '../templates/repository-pagination.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, infrastructure_repositories_folder, `api-${main_domain_folder}-repository.ts`), fillTemplate({
                domain_name: domain_name,
                domain_file: main_domain_folder,
                key_type: key_type,
                key_name: key_name,
            }, repository)
        );
    }else{
        const repository = fs.readFileSync( path.join(__dirname, '../templates/repository.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, infrastructure_repositories_folder, `api-${main_domain_folder}-repository.ts`), fillTemplate({
                domain_name: domain_name,
                domain_file: main_domain_folder,
                key_type: key_type,
                key_name: key_name,
            }, repository)
        );
    }
    
    console.log(`📄 Api  ${domain_name} repository created `);
}

function stores(domain_name: string, store_folder: string, baseDir: string, key_name: string, key_type: string, confirm_pagination: boolean){

    const main_domain_folder = toKebabCase(domain_name);

    //stores
    const create = fs.readFileSync( path.join(__dirname, '../templates/stores/create.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `create-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
        }, create)
    );
    console.log(`📄 Store to create ${domain_name} created `);

    const update = fs.readFileSync( path.join(__dirname, '../templates/stores/update.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `update-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
            key_type: key_type,
            key_name: key_name,
        }, update)
    );
    console.log(`📄 Store to create ${domain_name} update `);

    const remove = fs.readFileSync( path.join(__dirname, '../templates/stores/delete.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `delete-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
            key_type: key_type,
            key_name: key_name,
        }, remove)
    );
    console.log(`📄 Store to create ${domain_name} remove`);

    const detail = fs.readFileSync( path.join(__dirname, '../templates/stores/detail.md'), 'utf-8');
    fs.writeFileSync(path.join(baseDir, store_folder, `detail-${main_domain_folder}.ts`), fillTemplate({
            domain_file: main_domain_folder,
            domain_name: domain_name,
            store_name: `${toUpperSnakeCase(domain_name)}`,
            key_type: key_type,
            key_name: key_name,
        }, detail)
    );
    console.log(`📄 Store to create ${domain_name} detail`);

    if( confirm_pagination ){
        const list = fs.readFileSync( path.join(__dirname, '../templates/stores/list-pagination.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, store_folder, `list-${main_domain_folder}.ts`), fillTemplate({
                domain_file: main_domain_folder,
                domain_name: domain_name,
                store_name: `${toUpperSnakeCase(domain_name)}`,
            }, list)
        );
    }else{
        const list = fs.readFileSync( path.join(__dirname, '../templates/stores/list.md'), 'utf-8');
        fs.writeFileSync(path.join(baseDir, store_folder, `list-${main_domain_folder}.ts`), fillTemplate({
                domain_file: main_domain_folder,
                domain_name: domain_name,
                store_name: `${toUpperSnakeCase(domain_name)}`,
            }, list)
        );
    }
    console.log(`📄 Store to create ${domain_name} list`);
}