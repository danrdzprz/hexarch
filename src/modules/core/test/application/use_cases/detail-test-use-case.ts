import type { Test } from "../../domain/entities/test";
import type { TestRepositoryContract } from "../../domain/contracts/test-repository-contract";

export function DetailTestUseCase (repository: TestRepositoryContract) {
	return async (id: number): Promise<Test> => {
		return await repository.detail(id);
	};
}