import { forwardRef, useState, useEffect, useCallback } from 'react';
import { ReactSVG } from 'react-svg';
import { ScrollerProps, TableVirtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useStateWithDeps } from 'use-state-with-deps';

import Link from 'next/link';
import { useRouter } from 'next/router';

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
    TableRowProps,
} from '@mui/material';

import axios from 'axios';
import Image from 'next/image';
import typeIs from 'type-is';
import dayjs from 'dayjs';

import { capitalize } from '@/helpers/dataManipulation/strings';
import { formatFileSize } from '@/helpers/formatting';
import { genPurchaseUrl } from '@/helpers/endpoints/datasets';
import api from '@/helpers/api';

import trash from '@/icons/main/trash-2.svg';

import classes from './styles.module.css';



const TableComponents = {
    Scroller: forwardRef<HTMLDivElement, ScrollerProps>(function _Scroller(
        props,
        ref
    ) {
        return (
            <TableContainer
                { ...props }
                style={ {
                    ...props.style,
                    height: 'unset',
                } }
                className={ classes.viewerTableScroller }
                ref={ ref }
            />
        );
    }),
    Table: forwardRef<HTMLTableElement, TableProps>(function _Table(
        props,
        ref
    ) {
        return (
            <Table { ...props } className={ classes.viewerTableInner } ref={ ref } />
        );
    }),
    TableHead: forwardRef<HTMLTableSectionElement, TableHeadProps>(
        function _TableHead(props: TableHeadProps, ref) {
            return (
                <TableHead
                    { ...props }
                    className={ `${classes.viewerTableHead} ${
                        props.className || ''
                    }` }
                    ref={ ref }
                />
            );
        }
    ),
    TableRow: forwardRef<HTMLTableRowElement, TableRowProps>(function _TableRow(
        props: TableRowProps,
        ref
    ) {
        return (
            <TableRow
                { ...props }
                className={ `${classes.viewerTableRow} ${props.className || ''}` }
                ref={ ref }
            />
        );
    }),
    TableBody: forwardRef<HTMLTableSectionElement, TableBodyProps>(
        function _TableBody(props: TableBodyProps, ref) {
            return (
                <TableBody
                    { ...props }
                    className={ `${classes.viewerTableBody} ${
                        props.className || ''
                    }` }
                    ref={ ref }
                />
            );
        }
    ),
};

function TextComponent(props: { url: string }) {
    const [text, setText] = useState('');

    useEffect(() => {
        async function fetchThis() {
            const textData = await axios
                .get<string>(props.url, {
                    responseType: 'text',
                })
                .then((res) => res.data);
            setText(textData);
        }

        fetchThis().then();
    }, [props.url]);

    return <code className={ classes.textViewer }>{ text }</code>;
}

function AssetTile(props: {
    item: Flockfysh.Asset & {
        selected: boolean;
    };
    delAsset: (id: string) => void;
}) {
    let component;

    if (typeIs.is(props.item.mimetype, ['image/*']))
        component = (
            <Image
                fill={ true }
                className={ classes.image }
                src={ props.item.url }
                alt={ props.item.displayName }
            />
        );
    else if (typeIs.is(props.item.mimetype, ['text/*', 'application/json']))
        component = <TextComponent url={ props.item.url } />;
    else component = <div />;

    return (
        <div className={ classes.imageWrapper }>
            { component }

            <button
                className={ classes.imageButton }
                onClick={ () => {
                    props.delAsset(props.item._id);
                } }
            >
                <ReactSVG className={ classes.icon } src={ trash.src } />
            </button>
        </div>
    );
}

interface AssetViewerState {
    hasMore: boolean;
    assets: Map<
        string,
        Flockfysh.Asset & {
            selected: boolean;
        }
    >;
    initialLoad: boolean;
    next: string | undefined;
}

function CustomTableCell(props: TableCellProps) {
    return (
        <TableCell
            { ...props }
            ref={ props.ref }
            className={ `${props.className || ''} ${classes.viewerTableCell}` }
        >
            <div className={ classes.viewerTableCellInner }>{ props.children }</div>
        </TableCell>
    );
}

export default function AssetViewer(props: {
    datasetId: string;
    datasetPermissionLevel?: Flockfysh.DatasetAccessLevel;
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

    const [state, setState] = useStateWithDeps<AssetViewerState>(initialState, [
        props.datasetId,
        props.searchQuery.displayName,
    ]);

    

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
                        <input
                            type="checkbox"
                            checked={ assetArray.every(
                                (asset) => asset.selected
                            ) }
                            onChange={ (e) => {
                                const checked = e.currentTarget.checked;

                                assetArray.forEach((asset) => {
                                    asset.selected = checked;
                                });

                                setState((prev) => ({ ...prev }));
                            } }
                        />
                    </CustomTableCell>

                    <CustomTableCell>File name</CustomTableCell>

                    <CustomTableCell className={ classes.uploadDate }>
                        Uploaded at
                    </CustomTableCell>

                    <CustomTableCell>Type</CustomTableCell>

                    <CustomTableCell>Status</CustomTableCell>

                    <CustomTableCell>Size</CustomTableCell>

                    <CustomTableCell />
                </TableRow>
            </>
        );
    }

    const load = useCallback(
        async function (numItems: number = 20) {
            if (state.hasMore) {
                const datasetId = props.datasetId;

                try {
                    const result = (
                        await api.get<Api.PaginatedResponse<Flockfysh.Asset[]>>(
                            `/api/datasets/${datasetId}/assets`,
                            {
                                params: {
                                    next: state.next,
                                    displayName: props.searchQuery.displayName,
                                    limit: numItems,
                                },
                            }
                        )
                    ).data;

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
        },
        [
            props.datasetId,
            props.searchQuery.displayName,
            state.assets,
            state.hasMore,
            state.next,
            setState,
        ]
    );

    const [payment, setPaymentData] = useState({
        purchaseLink: '#'
    })

    useEffect(() => {
        async function fetchData() {

            if(props.datasetPermissionLevel == 'preview'){
                const clientSecret = await api.post(`/api/payments/purchaseDataset`, {
                    datasetId: props.datasetId
                })    
                setPaymentData({...payment, purchaseLink: clientSecret.data.data})    
            }

        }

        fetchData()
    }, [props.datasetId])

    useEffect(() => {
        if (state.initialLoad) {
            setState((prev) => {
                return {
                    ...prev,
                    initialLoad: false,
                };
            });

            load(20).then();
        }
    }, [state, load, setState]);

    const router = useRouter()

    if (props.datasetPermissionLevel === 'preview') {
        return (
            <div className={ classes.purchaseOverlay }>
                <h2 className={ classes.purchaseHeading }>
                    This dataset requires purchasing access.
                </h2>
                <p>
                    <Link
                        href={payment.purchaseLink}
                        className={ classes.purchaseLink }
                        target='_blank'
                    >
                        
                        Purchase this dataset
                    </Link>{ ' ' }
                    to gain access to its assets.
                </p>
            </div>
        );
    }

    if (!props.showList) {
        return (
            <VirtuosoGrid
                data={ assetArray }
                className={ classes.gridContainer }
                listClassName={ classes.gridWrapper }
                endReached={ () => load().then() }
                itemContent={ (_index, item) => (
                    <AssetTile
                        item={ item }
                        key={ item._id }
                        delAsset={ () => delAsset(item._id) }
                    />
                ) }
            />
        );
    }

    return (
        <div className={ classes.viewerTableContainer }>
            <TableVirtuoso
                data={ assetArray }
                fixedHeaderContent={ Header }
                components={ TableComponents }
                endReached={ () => load() }
                itemContent={ function genRow(_index, data) {
                    return (
                        <>
                            <CustomTableCell>
                                <input
                                    type="checkbox"
                                    checked={ data.selected }
                                    onChange={ (e) => {
                                        const item = state.assets.get(data._id);

                                        if (item)
                                            item.selected =
                                                e.currentTarget.checked;

                                        setState((prev) => ({ ...prev }));
                                    } }
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <span className={ classes.filename }>
                                    <span className={ classes.filenameText }>
                                        { data.displayName }
                                    </span>
                                </span>
                            </CustomTableCell>

                            <CustomTableCell className={ classes.uploadDate }>
                                <span>
                                    { dayjs(data.uploadedAt).format(
                                        'DD/MM/YYYY'
                                    ) }
                                </span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ capitalize(data.type) }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ capitalize(data.stage) }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <span>{ formatFileSize(data.size) }</span>
                            </CustomTableCell>

                            <CustomTableCell>
                                <button
                                    onClick={ () => delAsset(data._id) }
                                    className={ classes.deleteButton }
                                >
                                    <ReactSVG
                                        className={ classes.icon }
                                        src={ trash.src }
                                    />
                                </button>
                            </CustomTableCell>
                        </>
                    );
                } }
            />
        </div>
    );
}
