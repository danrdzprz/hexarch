import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { ResponseFailure } from '~/modules/shared/domain/entities/response-failure';
import type { ResponseSuccess } from '~/modules/shared/domain/entities/response-success';
import { ApiTestRepository } from '../infrastructure/repositories/api-test-repository';
import { CreateTestUseCase } from '../application/use_cases/create-test-use-case';
import type { CreateTest } from '../application/dtos/create-test';

export const useCreateTest = defineStore('CREATE_TEST',{
      state: ():{status: RequestStatus, message:  ResponseSuccess['message'] | null, errors: ResponseFailure["message"]}=> {
        return {
          status:RequestStatus.INITIAL,
          message: null,
          errors: ''
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async save(data: CreateTest) {
          const repository = ApiTestRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await CreateTestUseCase(
              repository,
            )(data)
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.message = HandleSuccessResponse(response);
              return response;
            })
            .catch( e => {
              this.status = RequestStatus.ERROR ;
              this.errors = HandleServerErrors(e);
            });
        },
        setFormStatus( value: RequestStatus ) {
          return this.status = value;
        },
        resetForm() {
          return this.status = RequestStatus.INITIAL;
        },
      }
  });
