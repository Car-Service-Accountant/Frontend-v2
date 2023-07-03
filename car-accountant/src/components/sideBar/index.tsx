import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme, styled, Divider } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import React, { useEffect, useState } from "react"
import Link from "next/link";
interface SidebarProps {
    children: React.ReactNode
}

export const SideBar: React.FC<SidebarProps> = ({ children }) => {
    const theme = useTheme()
    // resurce needed to make it look good at responsible variant
    const isSmall = useMediaQuery(theme.breakpoints.down("md"))
    const isMedium = useMediaQuery(theme.breakpoints.down("lg"))
    const leftSideSx = isMedium ? isSmall ? 4 : 3 : 2
    // 
    const [isCollapsed, setIsCollapsed] = useState(true)

    console.log('isMedium', isMedium);
    console.log('isCollapsed', isCollapsed);
    console.log('isSmall', isSmall);

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
    }

    const RootGrid = styled(Grid)(({ theme }) => ({
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
            marginLeft: "25px",
            height: "50px",
        },
        [`& .${classes.iconLink}:hover`]: {
            backgroundColor: "rgb(256,256,256,0.3)",
            marginLeft: "-25px",
            paddingLeft: "50px",
            transform: "translateX(10px)",
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
            animation: `${classes.shake} 0.7s`,
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
        <RootGrid container>
            <Grid item xs={isCollapsed ? 1 : leftSideSx}>
                <Box
                    height="100vh"
                    width={isCollapsed ? "40px" : "100%"}
                    bgcolor={theme.palette.primary.main}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {!isCollapsed && <Box style={{ width: "100%", height: "inherit", marginTop: "250px", marginRight: isSmall ? "20px" : "0px" }}>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                <GridViewRoundedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                                Табло
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Добави кола
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Добави ремонт
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Всички коли
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Коли в ремонт
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Чакащи плащания
                            </Typography>
                        </Link>
                        <Divider className={classes.divider} />
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Отчети
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Допълнителен разход
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Всички служители
                            </Typography>
                        </Link>
                        <Link href="/" className={classes.iconLink}>
                            <Typography className={classes.button}>
                                Добави служител
                            </Typography>
                        </Link>
                    </Box>}
                    {isSmall && <IconButton style={{ position: "absolute", top: "10%", color: "white", left: isCollapsed ? "0%" : "25%" }} onClick={handleToggleCollapse}>
                        {isCollapsed ? <MenuIcon /> : <ClearIcon />}
                    </IconButton>}
                </Box>
            </Grid>
            <Grid item xs={isCollapsed ? 11 : (12 - leftSideSx)} bgcolor={theme.palette.background.default}>
                {children}
            </Grid>
        </RootGrid>
    )
}