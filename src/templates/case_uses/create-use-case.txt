import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";
import type { Create{{domain_name}} } from "../dtos/create-{{domain_file}}";

export function Create{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async (data: Create{{domain_name}}): Promise<ResponseSuccess> => {
		return await repository.create(data);
	};
}