import type { ResponseFailure } from "~/modules/shared/domain/entities/response-failure";
import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { TestRepositoryContract } from "../../domain/contracts/test-repository-contract";
import type { Test } from "../../domain/entities/test";
import type { CreateTest } from "../../application/dtos/create-test";
import type { UpdateTest } from "../../application/dtos/update-test";

export function ApiTestRepository(): TestRepositoryContract {

	async function list(): Promise<Test[]> {
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
				resolve(await response.json() as Test[]);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}

	async function create( data: CreateTest): Promise<ResponseSuccess> {
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

	

	async function detail( id: number ): Promise<Test> {
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
				resolve(await response.json() as Test);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}


	async function update(id: number, data: UpdateTest): Promise<ResponseSuccess> {
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

	async function destroy(id: number): Promise<ResponseSuccess> {
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