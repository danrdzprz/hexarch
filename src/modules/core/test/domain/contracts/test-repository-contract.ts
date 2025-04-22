import type { PaginationOptions } from "~/modules/shared/domain/entities/pagination-options";
import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { Test } from "../entities/test";
import type { CreateTest } from "../../application/dtos/create-test";
import type { UpdateTest } from "../../application/dtos/update-test";


export interface TestRepositoryContract 
{
	list: () => Promise<Test[]>;
    create: (data: CreateTest) => Promise<ResponseSuccess>;
    detail: (id:number) => Promise<Test>;
    update: (id:number, data: UpdateTest) => Promise<ResponseSuccess>;
    destroy: (id:number) => Promise<ResponseSuccess>;
}