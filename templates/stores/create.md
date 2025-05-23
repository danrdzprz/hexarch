import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { ResponseFailure } from '~/modules/shared/domain/entities/response-failure';
import type { ResponseSuccess } from '~/modules/shared/domain/entities/response-success';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';
import { Create{{domain_name}}UseCase } from '../application/use_cases/create-{{domain_file}}-use-case';
import type { Create{{domain_name}} } from '../application/dtos/create-{{domain_file}}';

export const useCreate{{domain_name}} = defineStore('CREATE_{{store_name}}',{
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
        async save(data: Create{{domain_name}}) {
          const repository = Api{{domain_name}}Repository();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await Create{{domain_name}}UseCase(
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
