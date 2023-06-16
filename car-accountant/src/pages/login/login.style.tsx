import { Box, styled } from "@mui/material";

const PREFIX = 'login'

export const classes = {
    left: `${PREFIX}-left`,
    right: `${PREFIX}-right`,
    loginForm: `${PREFIX}-loginForm`,
    loginField: `${PREFIX}-loginField`,
}

const Wraper = styled(Box)(({ theme }) => ({
    [`& .${classes.left}`]: {
        backgroundColor: theme.palette.primary.main,
    },
    [`& .${classes.right}`]: {
        backgroundColor: theme.palette.background.paper,
    },
    [`& .${classes.loginForm}`]: {
        margin: "30px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
    },
    [`& .${classes.loginField}`]: {
        gridColumn: 'span 4',
        marginLeft: "50px",
        maxWidth: "-webkit-fill-available",
        marginRight: "50px",
        "& .input": {
            background: "white",
        },
    },
}))

export default Wraper