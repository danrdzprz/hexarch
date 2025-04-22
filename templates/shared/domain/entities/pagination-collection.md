export type PaginationCollection<T>={
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string|null;
        next: string|null;
    },
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: link[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}

interface link{
    url: string|null;
    label: string|null;
    active: boolean;
}