import type { PaginationCollection } from "~/modules/shared/domain/entities/pagination-collection";
import type { PaginationOptions } from "~/modules/shared/domain/entities/pagination-options";
import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { {{domain_name}} } from "../entities/{{domain_file}}";
import type { Create{{domain_name}} } from "../../application/dtos/create-{{domain_file}}";
import type { Update{{domain_name}} } from "../../application/dtos/update-{{domain_file}}";
import type { List{{domain_name}} } from "../../application/dtos/list-{{domain_file}}";
import type { Catalog } from "~/modules/shared/domain/entities/catalog";

export interface {{domain_name}}RepositoryContract 
{
	list: (data: PaginationOptions) => Promise<PaginationCollection<List{{domain_name}}>>;
    catalog: () => Promise<Catalog[]>;
    create: (data: Create{{domain_name}}) => Promise<ResponseSuccess>;
    detail: ({{key_name}}:{{key_type}}) => Promise<{{domain_name}}>;
    update: ({{key_name}}:{{key_type}}, data: Update{{domain_name}}) => Promise<ResponseSuccess>;
    destroy: ({{key_name}}:{{key_type}}) => Promise<ResponseSuccess>;
}