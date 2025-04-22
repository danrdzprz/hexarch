import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { ResponseFailure } from '~/modules/shared/domain/entities/response-failure';
import type { ResponseSuccess } from '~/modules/shared/domain/entities/response-success';
import { ApiTestRepository } from '../infrastructure/repositories/api-test-repository';
import { DeleteTestUseCase } from '../application/use_cases/delete-test-use-case';

export const useDeleteTest = defineStore('DELETE_TEST',{
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
        async remove(id: number) {
          const repository = ApiTestRepository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await DeleteTestUseCase(
              repository,
            )(id)
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
      }
  });
