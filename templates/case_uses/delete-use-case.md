import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";

export function Delete{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async ({{key_name}}: {{key_type}}): Promise<ResponseSuccess> => {
		return await repository.destroy({{key_name}});
	};
}