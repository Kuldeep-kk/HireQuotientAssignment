"use client";
import React, {useState} from "react";
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {IoIosArrowDropdownCircle} from "react-icons/io";
import styles from "@/app/components/mytable.module.css";
const AssetGroup = ({ assetType, assets }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell style={{ borderBottom: 'none' }}>
                    <div className="flex items-center font-bold">
                        <IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <IoIosArrowDropdownCircle className={`transition delay-75 rotate-180 text-pink-400`}  size={25}/> :<IoIosArrowDropdownCircle className={`transition delay-75 text-slate-200`}  size={25} />}
                        </IconButton>
                        <h2>{assetType.toUpperCase()} ({assets.length})</h2>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="details" className={`${styles.myTableP}`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{color:"#a9b4bb",fontWeight:"700",width:"auto",fontSize:"10px"}}>NAME OF THE HOLDING</TableCell>
                                        <TableCell style={{color:"#a9b4bb",fontWeight:"700",width:"auto",fontSize:"10px"}}>TICKER</TableCell>
                                        <TableCell style={{color:"#a9b4bb",fontWeight:"700",width:"auto",fontSize:"10px"}}>Average PRICE</TableCell>
                                        <TableCell style={{color:"#a9b4bb",fontWeight:"700",width:"auto",fontSize:"10px"}}>MARKET PRICE</TableCell>
                                        <TableCell style={{color:"#a9b4bb",fontWeight:"700",width:"auto",fontSize:"10px"}}>LATEST CHANGE PERCENTAGE</TableCell>
                                        <TableCell style={{color:"#a9b4bb",fontWeight:"700",width:"auto",fontSize:"10px"}}>MARKET VALUE IN BASE CCY</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assets.map((asset,index) => (
                                        <TableRow key={asset.name} style={{ backgroundColor: index % 2 === 0 ? '#F5FAFA' : 'transparent'}}  className={`${styles.myrow}`}>
                                            <TableCell style={{fontSize:"12px",fontWeight:"600",color:"slategray",paddingTop:"10px", paddingBottom:"10px"}}>{asset.name}</TableCell>
                                            <TableCell style={{fontSize:"12px",fontWeight:"600",color:"slategray",paddingTop:"10px", paddingBottom:"10px"}} >{asset.ticker}</TableCell>
                                            <TableCell style={{fontSize:"12px",fontWeight:"600",color:"slategray",paddingTop:"10px", paddingBottom:"10px"}}>{asset.avg_price}</TableCell>
                                            <TableCell style={{fontSize:"12px",fontWeight:"600",color:"slategray",paddingTop:"10px", paddingBottom:"10px"}}>{asset.market_price}</TableCell>
                                            <TableCell style={{fontSize:"12px",fontWeight:"600",color: asset.latest_chg_pct >=0 ? "slategray" : 'red',paddingTop:"10px", paddingBottom:"10px"}}>{asset.latest_chg_pct}</TableCell>
                                            <TableCell style={{fontSize:"12px",fontWeight:"600",color:"slategray",paddingTop:"10px", paddingBottom:"10px"}}>{asset.market_value_ccy}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
export default AssetGroup;
