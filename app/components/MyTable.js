"use client";
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, Paper } from '@mui/material';
import axios from 'axios';

import AssetGroup from "@/app/components/AssetGroup";
import {FadeLoader} from "react-spinners";

const AssetTable = () => {
    const [assets, setAssets] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
                const groupedAssets = response.data.payload.reduce((acc, asset) => {
                    const group = acc[asset.asset_class] || [];
                    group.push(asset);
                    acc[asset.asset_class] = group;
                    return acc;
                }, {});
                setAssets(groupedAssets);
            } catch (error) {
                console.error('Failed to fetch assets:', error);
            }
            setIsFetching(false);
        };

        fetchAssets();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-0">
            {isFetching ? (
                <div className="text-center m-auto ">
                    <FadeLoader color="#a1a4a4" className={`m-auto`} />
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                    <TableContainer component={Paper}>
                        <Table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                            <TableBody>
                                {Object.keys(assets).map((assetType) => (
                                    <AssetGroup key={assetType} assetType={assetType} assets={assets[assetType]} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default AssetTable;
