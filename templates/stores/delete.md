import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { ResponseFailure } from '~/modules/shared/domain/entities/response-failure';
import type { ResponseSuccess } from '~/modules/shared/domain/entities/response-success';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';
import { Delete{{domain_name}}UseCase } from '../application/use_cases/delete-{{domain_file}}-use-case';

export const useDelete{{domain_name}} = defineStore('DELETE_{{store_name}}',{
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
        async remove({{key_name}}: {{key_type}}) {
          const repository = Api{{domain_name}}Repository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await Delete{{domain_name}}UseCase(
              repository,
            )({{key_name}})
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
