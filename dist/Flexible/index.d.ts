import React from 'react';
interface Props extends React.HTMLProps<HTMLDivElement> {
    itemWidth: number;
    containerRef: React.RefObject<HTMLElement>;
    maxRows?: number;
    minRows?: number;
    children: React.ReactElement[];
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
//# sourceMappingURL=index.d.ts.map