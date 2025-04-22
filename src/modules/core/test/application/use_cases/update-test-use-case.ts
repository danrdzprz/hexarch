import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { TestRepositoryContract } from "../../domain/contracts/test-repository-contract";
import type { UpdateTest } from "../dtos/update-test";

export function UpdateTestUseCase (repository: TestRepositoryContract) {
	return async (id: number, data: UpdateTest): Promise<ResponseSuccess> => {
		return await repository.update(id, data);
	};
}