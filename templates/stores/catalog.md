import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/entities/request-status';
import type { Catalog } from "~/modules/shared/domain/entities/catalog";
import { Catalog{{domain_name}}UseCase } from '../application/use_cases/catalog-{{domain_file}}-use-case';
import { Api{{domain_name}}Repository } from '../infrastructure/repositories/api-{{domain_file}}-repository';

export const useList{{domain_name}} = defineStore('CATALOG_{{store_name}}',{
      state: ():{status: RequestStatus, data: Catalog[]}=> {
        return {
          status:RequestStatus.INITIAL,
          data:[],
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getCatalog() {
          const repository = Api{{domain_name}}Repository();
          this.status = RequestStatus.LOADING;
          return await Catalog{{domain_name}}UseCase(
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