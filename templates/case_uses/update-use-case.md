import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";
import type { Update{{domain_name}} } from "../dtos/update-{{domain_file}}";

export function Update{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async ({{key_name}}: {{key_type}}, data: Update{{domain_name}}): Promise<ResponseSuccess> => {
		return await repository.update({{key_name}}, data);
	};
}