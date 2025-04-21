import { defineStore } from 'pinia';
import type { PaginationCollection } from '~/modules/shared/domain/entities/pagination-collection';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { PaginationOptions } from '~/modules/shared/domain/entities/pagination-options';
import type { {{domain_name}} } from '../domain/entities/{{domain_file}}';
import { List{{domain_name}}UseCase } from '../application/use_cases/list-{{domain_file}}-use-case';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';

export const useList{{domain_name}} = defineStore('LIST_{{store_name}}',{
      state: ():{status: RequestStatus, data: PaginationCollection<{{domain_name}}>}=> {
        return {
          status:RequestStatus.INITIAL,
          data:{
            data: [],
            total: 0,
            current_page: 0,
          },
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getList(data: PaginationOptions) {
          const repository = Api{{domain_name}}Repository();
          this.status = RequestStatus.LOADING;
          return await List{{domain_name}}UseCase(
              repository,
            )(data)
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