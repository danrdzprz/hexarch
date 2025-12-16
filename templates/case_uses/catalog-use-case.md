import type { Catalog } from "~/modules/shared/domain/entities/catalog";
import type { {{domain_name}}RepositoryContract } from "../../domain/contracts/{{domain_file}}-repository-contract";

export function Catalog{{domain_name}}UseCase (repository: {{domain_name}}RepositoryContract) {
	return async (): Promise<Catalog[]> => {
		return await repository.catalog();
	};
}