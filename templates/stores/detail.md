
import { defineStore } from 'pinia';
import { Detail{{domain_name}}UseCase } from '../application/use_cases/detail-{{domain_file}}-use-case';
import type { {{domain_name}} } from '../domain/entities/{{domain_file}}';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';

export const useDetail{{domain_name}} = defineStore('DETAIL_{{store_name}}',{
      state: ():{status: RequestStatus, data: {{domain_name}}}=> {
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
        async detail({{key_name}}: {{key_type}}) {
          const repository = Api{{domain_name}}Repository();
          this.$reset();
          this.status = RequestStatus.LOADING;
          return await Detail{{domain_name}}UseCase(
              repository,
            )({{key_name}})
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