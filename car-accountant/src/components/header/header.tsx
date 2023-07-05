import { RootState } from "@/redux/store";
import { AppBar, Box, Toolbar, Typography, styled, useTheme } from "@mui/material"
import Image from "next/image";
import { useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 4px 4px rgba(128, 128, 128, 0.2)",
    height: "7vh",
    justifyContent: "center",
    maxHeight: "7vh",
}))

const HeaderWrapper = () => {

    const username = useSelector((state: RootState) => state.auth.user?.username)
    const theme = useTheme()
    return (
        <StyledAppBar style={{ position: "fixed" }}>
            <Toolbar>
                <Typography variant="h6" component="div" color={"black"}>
                    AutologBG
                </Typography>
                <Image
                    src={"/../public/pics/demo-logo.png"}
                    width={110}
                    height={60}
                    alt="Missing logo"
                />
                <Typography style={{ marginLeft: "5vw" }} variant="h6" color={theme.palette.text.primary} fontSize={16} >
                    Приятна работа ,<b>{username}</b> :)
                </Typography>
            </Toolbar>
        </StyledAppBar>
    );
};

export default HeaderWrapper;