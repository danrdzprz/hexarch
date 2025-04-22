import type { {{domain_name}} } from "../../domain/entities/{{domain_file}}";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";

export function Detail{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async ({{key_name}}: {{key_type}}): Promise<{{domain_name}}> => {
		return await repository.detail({{key_name}});
	};
}