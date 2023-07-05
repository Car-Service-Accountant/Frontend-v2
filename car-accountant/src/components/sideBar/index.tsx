import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme, styled, Divider } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from "react"
import Link from "next/link";

import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import CommuteIcon from '@mui/icons-material/Commute';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useRouter } from "next/router";
interface SidebarProps {
    children: React.ReactNode
}

export const SideBar: React.FC<SidebarProps> = ({ children }) => {
    const theme = useTheme()
    // resurce needed to make it look good at responsible variant
    const isSmall = useMediaQuery(theme.breakpoints.down("md"))
    // 

    const [isCollapsed, setIsCollapsed] = useState(true)
    const router = useRouter()
    const path = router.asPath

    const activePaths = {
        home: '/',
        AddCar: '/AddCar',
        AddRepair: '/AddRepair',
        AllCars: '/AllCars',
        CarsInRepair: "/CarsInRepair",
        AdditionalCost: "/AdditionalCost",
        AwaitingPayments: "/AwaitingPayments",
        Reports: "/Reports",
        AllEmployers: "/AllEmployers",
        AddEmployer: "/AddEmployer",
    }

    useEffect(() => {
        if (!isSmall) {
            setIsCollapsed(false)
        }
    }, [isSmall])

    const handleToggleCollapse = () => {
        if (isSmall) {
            setIsCollapsed(!isCollapsed);
        } else {
            setIsCollapsed(true)
        }
    };

    const PREFIX = "side-bar"

    const classes = {
        button: `${PREFIX}-button`,
        iconLink: `${PREFIX}-iconLink`,
        divider: `${PREFIX}-divider`,
        collapse: `${PREFIX}-collapse`,
        shake: `${PREFIX}-shake`,
        icon: `${PREFIX}-icon`,
        menuIcon: `${PREFIX}-menuIcon`,
        active: `${PREFIX}-active`,
    }

    const RootDiv = styled("div")(({ theme }) => ({
        [`& .${classes.button}`]: {
            display: "flex",
            alignItem: "center",
        },
        [`& .${classes.iconLink}`]: {
            display: "flex",
            alignItems: "center",
            color: "#fff",
            textDecoration: "none",
            justifyContent: "left",
            width: "100%",
            transition: "all 0.3s",
            marginLeft: isCollapsed ? "18px" : "25px",
            height: "50px",
        },
        [`& .${classes.iconLink}:hover`]: {
            backgroundColor: "rgb(256,256,256,0.3)",
            marginLeft: "-25px",
            paddingLeft: isCollapsed ? "43px" : "50px",
            transform: isCollapsed ? null : "translateX(10px)",
        },
        [`& .${classes.active}`]: {
            backgroundColor: "rgb(256, 256, 256, 0.3)",
            marginLeft: "-25px",
            paddingLeft: isCollapsed ? "43px" : "50px",
        },
        [`& .${classes.divider}`]: {
            borderColor: "#fff",
            borderWidth: "1px",
            marginLeft: "25px",
            marginRight: "25px",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor: "#fff",
        },
        [`& .${classes.iconLink}:hover .${classes.icon}`]: {
            animation: `${classes.shake} 1.0s`,
        },

        [`& .${classes.menuIcon}`]: {
            color: "white", left: isCollapsed ? "0%" : "25%"
        },
        [`@keyframes ${classes.shake}`]: {
            "0%": {
                transform: "rotate(0)",
            },
            "20%": {
                transform: "rotate(-20deg)",
            },
            "40%": {
                transform: "rotate(20deg)",
            },
            "60%": {
                transform: "rotate(-20deg)",
            },
            "80%": {
                transform: "rotate(20deg)",
            },
            "100%": {
                transform: "rotate(0)",
            },
        },

    }))

    return (
        <RootDiv style={{ display: "flex", marginTop: "7vh" }} className={isCollapsed ? "collapsed" : ""} >
            <div style={{
                flex: isCollapsed ? "0 0 65px" : "0 0 275px", minWidth: isCollapsed ? "65px" : "275px", backgroundColor: theme.palette.primary.main
            }}>
                <Box
                    height="100%"
                    width={isCollapsed ? "65px" : isSmall ? "275px" : "275px"}
                    minWidth={isCollapsed ? "65px" : "275px"}
                    bgcolor={theme.palette.primary.main}
                    display="flex"
                    position="fixed"
                    justifyContent="flex-start"
                    flexDirection="column"
                    paddingTop="50px"
                >
                    <Box >
                        {isSmall && <Box className={classes.iconLink} onClick={handleToggleCollapse} >
                            {isCollapsed ? <MenuIcon /> : <ClearIcon />}
                        </Box>}
                        <Link href="/" className={`${classes.iconLink} ${path === activePaths.home ? classes.active : ""}`}>
                            <GridViewIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Табло
                            </Typography>}
                        </Link>
                        <Link href="/AddCar" className={`${classes.iconLink} ${path === activePaths.AddCar ? classes.active : ""}`}>
                            <DirectionsCarOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Добави кола
                            </Typography>}
                        </Link>
                        <Link href="/AddRepair" className={`${classes.iconLink} ${path === activePaths.AddRepair ? classes.active : ""}`}>
                            <HandymanOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Добави ремонт
                            </Typography>}
                        </Link>
                        <Link href="/AllCars" className={`${classes.iconLink} ${path === activePaths.AllCars ? classes.active : ""}`}>
                            <CommuteIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Всички коли
                            </Typography>}
                        </Link>
                        <Link href="/CarsInRepair" className={`${classes.iconLink} ${path === activePaths.CarsInRepair ? classes.active : ""}`}>
                            <CarRepairOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Коли в ремонт
                            </Typography>}
                        </Link>
                        <Link href="/AwaitingPayments" className={`${classes.iconLink} ${path === activePaths.AwaitingPayments ? classes.active : ""}`}>
                            <AddCardOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Чакащи плащания
                            </Typography>}
                        </Link>
                        <Divider className={classes.divider} />
                        <Link href="/Reports" className={`${classes.iconLink} ${path === activePaths.Reports ? classes.active : ""}`}>
                            <AssessmentOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Отчети
                            </Typography>}
                        </Link>
                        <Link href="/AdditionalCost" className={`${classes.iconLink} ${path === activePaths.AdditionalCost ? classes.active : ""}`}>
                            <PaidOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Допълнителен разход
                            </Typography>}
                        </Link>
                        <Link href="/AllEmployers" className={`${classes.iconLink} ${path === activePaths.AllEmployers ? classes.active : ""}`}>
                            <Groups2OutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Всички служители
                            </Typography>}
                        </Link>
                        <Link href="/AddEmployer" className={`${classes.iconLink} ${path === activePaths.AddEmployer ? classes.active : ""}`}>
                            <PersonAddOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Добави служител
                            </Typography>}
                        </Link>
                    </Box>

                </Box>
            </div>
            <div style={{ flex: 1, backgroundColor: theme.palette.background.default }}>
                {children}
            </div>
        </RootDiv >
    )
}