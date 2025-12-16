import type { Detail{{domain_name}} } from "../../domain/entities/detail-{{domain_file}}";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";

export function Detail{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async ({{key_name}}: {{key_type}}): Promise<Detail{{domain_name}}> => {
		return await repository.detail({{key_name}});
	};
}