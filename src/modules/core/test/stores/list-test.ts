import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { Test } from '../domain/entities/test';
import { ListTestUseCase } from '../application/use_cases/list-test-use-case';
import { ApiTestRepository } from '../infrastructure/repositories/api-test-repository';

export const useListTest = defineStore('LIST_TEST',{
      state: ():{status: RequestStatus, data: Test[]}=> {
        return {
          status:RequestStatus.INITIAL,
          data:[],
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getList() {
          const repository = ApiTestRepository();
          this.status = RequestStatus.LOADING;
          return await ListTestUseCase(
              repository,
            )()
            .then(response => {
              this.status = RequestStatus.SUCCESS;
              this.data = response;
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              HandleServerErrors(error);
            });
        }
      }
});