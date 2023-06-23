import { forwardRef, useEffect, useState } from 'react';
import { ScrollerProps, TableVirtuoso } from 'react-virtuoso';

import {
    Table,
    TableBody,
    TableBodyProps,
    TableCell,
    TableCellProps,
    TableContainer,
    TableHead,
    TableHeadProps,
    TableProps,
    TableRow,
    TableRowProps
} from '@mui/material';

import dayjs from 'dayjs';

import api from '@/helpers/api';
import { capitalize } from '@/helpers/strings';
import { formatFileSize } from '@/helpers/formatting';

import classes from './styles.module.css';

type ActivityViewerState = {
    hasMore: boolean;
    data: (UserActivity | DatasetActivity)[];
    initialLoad: boolean;
    next: string | undefined;
}

const TableComponents = {
    Scroller: forwardRef<HTMLDivElement, ScrollerProps>(function _Scroller(props, ref) {
        return (
            <TableContainer
                { ...props }
                ref={ ref }
            />
        );
    }),
    Table: forwardRef<HTMLTableElement, TableProps>(function _Table(props, ref) {
        return (
            <Table
                { ...props }
                className={ classes.viewerTableInner }
                ref={ ref }
            />
        );
    }),
    TableHead: forwardRef<HTMLTableSectionElement, TableHeadProps>(function _TableHead(props: TableHeadProps, ref) {
        return (
            <TableHead
                { ...props }
                className={ `${ classes.viewerTableHead } ${ props.className || '' }` }
                ref={ ref }
            />
        );
    }),
    TableRow: forwardRef<HTMLTableRowElement, TableRowProps>(function _TableRow(props: TableRowProps, ref) {
        return (
            <TableRow
                { ...props }
                className={ `${ classes.viewerTableRow } ${ props.className || '' }` }
                ref={ ref }
            />
        );
    }),
    TableBody: forwardRef<HTMLTableSectionElement, TableBodyProps>(function _TableBody(props: TableBodyProps, ref) {
        return (
            <TableBody
                { ...props }
                className={ `${ classes.viewerTableBody } ${ props.className || '' }` }
                ref={ ref }
            />
        );
    }),
};

function CustomTableCell(props: TableCellProps) {
    return (
        <TableCell
            { ...props }
            ref={ props.ref }
            className={ `${ props.className || '' } ${ classes.viewerTableCell }` }
        >
            <div className={ classes.viewerTableCellInner }>
                { props.children }
            </div>
        </TableCell>
    );
}

function Header() {
    return (
        <>
            <TableRow>
                <CustomTableCell >
                    Date & Time
                </CustomTableCell>
                
                <CustomTableCell>
                    Username
                </CustomTableCell>

                <CustomTableCell>
                    Action
                </CustomTableCell>
                
                <CustomTableCell>
                    Number of Files
                </CustomTableCell>

                <CustomTableCell>
                    Size
                </CustomTableCell>

                <CustomTableCell>
                    Type
                </CustomTableCell>
            </TableRow>
        </>
    );
}

export default function ActivityTable(props: { datasetId?: string, userId?: string }) {
    const fakeData = new Array(200).fill(
        {
            id: '1',
            date: new Date(),
            action: ['added', 'removed', 'uploaded', 'initiated'][Math.floor(Math.random() * 4)] as ('added' | 'removed' | 'uploaded' | 'initiated'),
            numFiles: Math.floor(Math.random() * 20),
            size: Math.random() * 2.5e+10,
            type: 'image' as Flockfysh.AssetType,
            userName: 'praks',
        }
    );
    
    const initialState = (): ActivityViewerState => {
        return {
            data: fakeData,
            hasMore: true,
            initialLoad: true,
            next: undefined,
        };
    };

    const [state, setState] = useState<ActivityViewerState>(initialState);
    const dataArray = state.data;

    console.log(dataArray);

    async function load(numItems: number=20) {
        // TODO: connect w/ backend
        if (state.hasMore) {
            if(props.datasetId) {
                const datasetId = props.datasetId;
    
                try {
                    const result = (await api.get<Api.PaginatedResponse<DatasetActivity[]>>(`/api/`, {
                        params: {
                            next: state.next,
                            datasetId: datasetId,
                            limit: numItems,
                        },
                    })).data;

                    for (const item of result.data) {
                        state.data.push(item);
                    }

                    setState((prev) => {
                        return {
                            ...prev,
                            next: result.meta.next,
                            hasMore: result.meta.hasNext,
                            data: state.data,
                        };
                    });
                }
                catch (e) {
                    return;
                }
            }
            else {
                const userId = props.userId;
                
                try {
                    const result = (await api.get<Api.PaginatedResponse<UserActivity[]>>(`/api/`, {
                        params: {
                            next: state.next,
                            userId: userId,
                            limit: numItems,
                        },
                    })).data;

                    for (const item of result.data) {
                        state.data.push(item);
                    }

                    setState((prev) => {
                        return {
                            ...prev,
                            next: result.meta.next,
                            hasMore: result.meta.hasNext,
                            data: state.data,
                        };
                    });
                }
                catch (e) {
                    return;
                }
            }
        }
    }

    useEffect(() => {
        if (state.initialLoad) {
            setState(prev => {
                return {
                    ...prev,
                    initialLoad: false,
                };
            });
            load(20).then();
        }
    }, [state]);
    
    return (
        <div className={ classes.dataCardContainer }>
            <TableVirtuoso
                data={ dataArray }
                fixedHeaderContent={ Header }
                className={ classes.viewerTable }
                components={ TableComponents }
                endReached={ () => load() }
                itemContent={ function genRow(index, data) {
                    return (
                        <>   
                            <CustomTableCell className={ classes.uploadDate }>
                                <span>{ dayjs(data.date).format('DD/MM/YYYY') }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span className={ classes.filename }>
                                    <span className={ classes.filenameText }>
                                        { 'dataset' in data ? data.dataset : data.userName }
                                    </span>
                                </span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ capitalize(data.action) }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ data.numFiles }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ formatFileSize(data.size) }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ capitalize(data.type) }s</span>
                            </CustomTableCell>
                        </>
                    );
                } }
            />
        </div>
    );
}
