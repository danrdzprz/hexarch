import type { PaginationOptions } from "~/modules/shared/domain/entities/pagination-options";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";
import type { {{domain_name}} } from "../../domain/entities/{{domain_file}}";

export function List{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async (): Promise<{{domain_name}}[]> => {
		return await repository.list();
	};
}