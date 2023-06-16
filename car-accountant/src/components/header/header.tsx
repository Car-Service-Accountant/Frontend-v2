import { AppBar, Box, Toolbar, Typography, styled, useTheme } from "@mui/material"
import { ReactNode } from "react";

type HeaderProps = {
    children: ReactNode
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    boxShadow: "0px 4px 4px rgba(128, 128, 128, 0.2)",
    zIndex: 1,
}))

const HeaderWrapper: React.FC<HeaderProps> = ({ children }) => {

    const theme = useTheme()

    return (
        <>
            <StyledAppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Your App Name
                    </Typography>
                </Toolbar>
            </StyledAppBar>
            {children}
        </>
    );
};

export default HeaderWrapper;