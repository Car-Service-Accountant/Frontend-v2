import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme, styled } from "@mui/material"
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
    const [isCollapsed, setIsCollapsed] = useState(false)

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
    }

    const RootGrid = styled(Grid)(({ theme }) => ({
        [`& .${classes.button}`]: {
            padding: "2px"
        },
        [`& .${classes.iconLink}`]: {
            display: "flex",
            alignItems: "center",
            color: "#fff",
            textDecoration: "none",
            transition: "opacity 0.3s",
            justifyContent: "center",
            width: "100%",
        },
        [`& .${classes.iconLink}:hover`]: {
            backgroundColor: "rgb(256,256,256,0.3)",
        }
    }))


    console.log("triggered isCollapsed ==>", isCollapsed);
    console.log("triggered isSmall ==>", isSmall);


    return (
        <>
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
                        <Box>
                            <Link href="/" className={classes.iconLink}>
                                <Typography className={classes.button}>
                                    <GridViewRoundedIcon />
                                    Добави кола
                                </Typography>
                            </Link>
                            <Link href="/" className={classes.iconLink}>
                                <Typography className={classes.button}>
                                    <GridViewRoundedIcon />
                                    Добави кола
                                </Typography>
                            </Link>

                            {isSmall && <IconButton onClick={handleToggleCollapse}>
                                {isCollapsed ? <MenuIcon /> : <ClearIcon />}
                            </IconButton>}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={isCollapsed ? 11 : (12 - leftSideSx)} bgcolor={theme.palette.background.default}>
                    {children}
                </Grid>
            </RootGrid>
        </>
    )
}