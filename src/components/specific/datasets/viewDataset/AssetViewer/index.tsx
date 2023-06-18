import React from 'react';
import {
    Table,
    TableBody,
    TableBodyProps, TableCell, TableCellProps, TableContainer,
    TableHead,
    TableHeadProps,
    TableProps,
    TableRow,
    TableRowProps
} from '@mui/material';
import api from '@/helpers/api';
import classes from './styles.module.css';
import { ReactSVG } from 'react-svg';
import trash from '@/icons/main/trash-2.svg';
import { ScrollerProps, TableVirtuoso, VirtuosoGrid } from 'react-virtuoso';
import dayjs from 'dayjs';
import { capitalize } from '@/helpers/strings';
import { formatFileSize } from '@/helpers/formatting';
import Image from 'next/image';

const TableComponents = {
    Scroller: React.forwardRef<HTMLDivElement, ScrollerProps>(function _Scroller(props, ref) {
        return (
            <TableContainer { ...props } className={ classes.viewerTableScroller } ref={ ref }/>
        );
    }),
    Table: React.forwardRef<HTMLTableElement, TableProps>(function _Table(props, ref) {
        return (
            <Table { ...props } className={ classes.viewerTableInner } ref={ ref }/>
        );
    }),
    TableHead: React.forwardRef<HTMLTableSectionElement, TableHeadProps>(function _TableHead(props: TableHeadProps, ref) {
        return (
            <TableHead { ...props }
                       className={ `${classes.viewerTableHead} ${props.className || ''}` } ref={ ref }></TableHead>
        );
    }),
    TableRow: React.forwardRef<HTMLTableRowElement, TableRowProps>(function _TableRow(props: TableRowProps, ref) {
        return (
            <TableRow { ...props }
                      className={ `${classes.viewerTableRow} ${props.className || ''}` } ref={ ref }></TableRow>
        );
    }),
    TableBody: React.forwardRef<HTMLTableSectionElement, TableBodyProps>(function _TableBody(props: TableBodyProps, ref) {
        return (
            <TableBody { ...props }
                       className={ `${classes.viewerTableBody} ${props.className || ''}` } ref={ ref }></TableBody>
        );
    }),
};

interface AssetViewerState {
    hasMore: boolean;
    assets: Map<string, Flockfysh.Asset & {
        selected: boolean;
    }>;
    initialLoad: boolean;
    next: string | undefined;
}

function CustomTableCell(props: TableCellProps) {
    return (
        <TableCell { ...props } ref={ props.ref }
                   className={ `${props.className || ''} ${classes.viewerTableCell}` }>
            <div className={ classes.viewerTableCellInner }>
                {props.children}
            </div>
        </TableCell>
    );
}


export default function AssetViewer(props: {
    datasetId: string;
    searchQuery: { displayName?: string };
    showList: boolean;
}) {
    const initialState = (): AssetViewerState => {
        return {
            assets: new Map(),
            hasMore: true,
            initialLoad: true,
            next: undefined,
        };
    };

    const [state, setState] = React.useState<AssetViewerState>(initialState);
    const assetArray = Array.from(state.assets.values());

    async function delAsset(id: string) {
        await api.delete(`/api/assets/${id}`);
        state.assets.delete(id);
        setState((prev) => {
            return { ...prev };
        });
    }

    function Header() {
        return (
            <>
                <TableRow>
                    <CustomTableCell>
                        <input type={ 'checkbox' } checked={ assetArray.every(asset => asset.selected) }
                               onChange={ (e) => {
                                   const checked = e.currentTarget.checked;
                                   assetArray.forEach(asset => {
                                       asset.selected = checked;
                                   });
                                   setState(prev => {
                                       return { ...prev };
                                   });
                               } }/>
                    </CustomTableCell>
                    <CustomTableCell>
                        File name
                    </CustomTableCell>
                    <CustomTableCell className={ classes.uploadDate }>
                        Uploaded at
                    </CustomTableCell>
                    <CustomTableCell>
                        Type
                    </CustomTableCell>
                    <CustomTableCell>
                        Status
                    </CustomTableCell>
                    <CustomTableCell>
                        Size
                    </CustomTableCell>
                    <CustomTableCell>

                    </CustomTableCell>
                </TableRow>
            </>
        );
    }

    async function load(numItems: number = 20) {
        if (state.hasMore) {
            const datasetId = props.datasetId;
            try {
                const result = (await api.get<Api.PaginatedResponse<Flockfysh.Asset[]>>(`/api/datasets/${datasetId}/assets`, {
                    params: {
                        next: state.next,
                        displayName: props.searchQuery.displayName,
                        limit: numItems,
                    },
                })).data;
                for (const item of result.data) {
                    state.assets.set(item._id, {
                        ...item,
                        selected: false,
                    });
                }
                setState((prev) => {
                    return {
                        ...prev,
                        next: result.meta.next,
                        hasMore: result.meta.hasNext,
                        assets: state.assets,
                    };
                });
            }
 catch (e) {
                return;
            }
        }
    }

    React.useEffect(() => {
        setState(initialState);
    }, [props.datasetId, props.searchQuery.displayName]);

    React.useEffect(() => {
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

    if (!props.showList) {
        return (
            <VirtuosoGrid
                data={ assetArray }
                className={ classes.gridContainer }
                listClassName={ classes.gridWrapper }
                endReached={ () => load().then() }
                itemContent={ (index, item) => {
                    return (
                        <div className={ classes.imageWrapper }>
                            <Image fill={ true } className={ classes.image } src={ item.url }
                                   alt={ item.displayName }/>

                            <button className={ classes.imageButton } onClick={ () => {
                                delAsset(item._id).then();
                            } }>
                                <ReactSVG className={ classes.icon } src={ trash.src }/>
                            </button>
                        </div>
                    );
                } }>
            </VirtuosoGrid>
        );
    }

    return (
        <div className={ classes.viewerTableContainer }>
            <TableVirtuoso
                data={ assetArray }
                fixedHeaderContent={ Header }
                className={ classes.viewerTable }
                components={ TableComponents }
                endReached={ () => load() }
                itemContent={ function genRow(index, data) {
                    return (
                        <>
                            <CustomTableCell><input type={ 'checkbox' } checked={ data.selected }
                                                    onChange={ e => {
                                                        const item = state.assets.get(data._id);
                                                        if (item) {
                                                            item.selected = e.currentTarget.checked;
                                                        }
                                                        setState((prev) => {
                                                            return { ...prev };
                                                        });
                                                    } }/></CustomTableCell>
                            <CustomTableCell>
                                <span className={ classes.filename }>
                                    <span className={ classes.filenameText }>{data.displayName}</span>
                                </span>
                            </CustomTableCell>
                            <CustomTableCell className={ classes.uploadDate }>
                                <span>{dayjs(data.uploadedAt).format('DD/MM/YYYY')}</span>
                            </CustomTableCell>
                            <CustomTableCell>
                                <span>{capitalize(data.type)}</span>
                            </CustomTableCell>
                            <CustomTableCell>
                                <span>{capitalize(data.stage)}</span>
                            </CustomTableCell>
                            <CustomTableCell>
                                <span>{formatFileSize(data.size)}</span>
                            </CustomTableCell>
                            <CustomTableCell>
                                <button onClick={ () => delAsset(data._id) } className={ classes.deleteButton }>
                                    <ReactSVG className={ classes.icon } src={ trash.src }/>
                                </button>
                            </CustomTableCell>
                        </>
                    );
                } }
            />
        </div>
    );
}
