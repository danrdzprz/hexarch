import type { PaginationCollection } from "~/modules/shared/domain/entities/pagination-collection";
import type { PaginationOptions } from "~/modules/shared/domain/entities/pagination-options";
import type { ResponseFailure } from "~/modules/shared/domain/entities/response-failure";
import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";
import type { {{domain_name}} } from "../../domain/entities/{{domain_file}}";
import type { Create{{domain_name}} } from "../../application/dtos/create-{{domain_file}}";
import type { Update{{domain_name}} } from "../../application/dtos/update-{{domain_file}}";

export function Api{{domain_name}}Repository(): {{domain_name}}RepositoryContract {

	async function list(data: PaginationOptions): Promise<PaginationCollection<{{domain_name}}>> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(`api-url${data}`,{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				resolve(await response.json() as PaginationCollection<{{domain_name}}>);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}

	async function create( data: Create{{domain_name}}): Promise<ResponseSuccess> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(`api-url`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify(data),
			});
			if(response.ok){
				resolve(await response.json() as ResponseSuccess);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}

	

	async function detail( {{key_name}}: {{key_type}} ): Promise<{{domain_name}}> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(`api-url`,{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				resolve(await response.json() as {{domain_name}});
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}


	async function update({{key_name}}: {{key_type}}, data: Update{{domain_name}}): Promise<ResponseSuccess> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(`api-url`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify(data),
			});
			if(response.ok){
				resolve(await response.json() as ResponseSuccess);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}

	async function destroy({{key_name}}: {{key_type}}): Promise<ResponseSuccess> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(`api-url`,{
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				resolve(await response.json() as ResponseSuccess);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}
   

	return {
		list,
		create,
		update,
		detail,
		destroy,
	};
}