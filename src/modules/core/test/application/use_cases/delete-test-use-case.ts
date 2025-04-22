import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { TestRepositoryContract } from "../../domain/contracts/test-repository-contract";

export function DeleteTestUseCase (repository: TestRepositoryContract) {
	return async (id: number): Promise<ResponseSuccess> => {
		return await repository.destroy(id);
	};
}