import type { ResponseSuccess } from "~/modules/shared/domain/entities/response-success";
import type { TestRepositoryContract } from "../../domain/contracts/test-repository-contract";
import type { CreateTest } from "../dtos/create-test";

export function CreateTestUseCase (repository: TestRepositoryContract) {
	return async (data: CreateTest): Promise<ResponseSuccess> => {
		return await repository.create(data);
	};
}