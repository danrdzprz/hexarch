import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { ResponseFailure } from '~/modules/shared/domain/entities/response-failure';
import type { ResponseSuccess } from '~/modules/shared/domain/entities/response-success';
import type { Update{{domain_name}} } from '../application/dtos/update-{{domain_file}}';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';
import { Update{{domain_name}}UseCase } from '../application/use_cases/update-{{domain_file}}-use-case';

export const useUpdate{{domain_name}} = defineStore('UPDATE_{{store_name}}',{
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
        async update({{key_name}}: {{key_type}}, data: Update{{domain_name}}) {
          const repository = Api{{domain_name}}Repository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await Update{{domain_name}}UseCase(
              repository,
            )({{key_name}}, data)
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
