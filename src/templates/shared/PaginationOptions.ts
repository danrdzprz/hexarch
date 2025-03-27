export type PaginationOptions={
    page:number;
    itemsPerPage:number;
    sortBy?: Array<{key:string, order:'asc'|'desc'}>;
    search?:string;
    columns?: string[];
}