import type { PaginationOptions } from "~/modules/shared/domain/entities/pagination-options";
import type { TestRepositoryContract } from "../../domain/contracts/test-repository-contract";
import type { Test } from "../../domain/entities/test";

export function ListTestUseCase (repository: TestRepositoryContract) {
	return async (): Promise<Test[]> => {
		return await repository.list();
	};
}