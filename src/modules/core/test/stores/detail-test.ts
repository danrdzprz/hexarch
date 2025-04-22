
import { defineStore } from 'pinia';
import { DetailTestUseCase } from '../application/use_cases/detail-test-use-case';
import type { Test } from '../domain/entities/test';
import { ApiTestRepository } from '../infrastructure/repositories/api-test-repository';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';

export const useDetailTest = defineStore('DETAIL_TEST',{
      state: ():{status: RequestStatus, data: Test}=> {
        return {
          status:RequestStatus.INITIAL,
          data:{
          }
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async detail(id: number) {
          const repository = ApiTestRepository();
          this.$reset();
          this.status = RequestStatus.LOADING;
          return await DetailTestUseCase(
              repository,
            )(id)
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