import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { {{domain_name}} } from '../domain/entities/{{domain_file}}';
import { List{{domain_name}}UseCase } from '../application/use_cases/list-{{domain_file}}-use-case';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';
import type { List{{domain_name}} } from '../domain/entities/list-{{domain_file}}';

export const useList{{domain_name}} = defineStore('LIST_{{store_name}}',{
      state: ():{status: RequestStatus, data: List{{domain_name}}[]}=> {
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
          const repository = Api{{domain_name}}Repository();
          this.status = RequestStatus.LOADING;
          return await List{{domain_name}}UseCase(
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