type IDataTableCompareFunction<T = any> = (a: T, b: T) => number;
type ISelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
type IDataTableHeader = {
    key: string;
    value?: ISelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: IDataTableCompareFunction;
};

export { IDataTableHeader }