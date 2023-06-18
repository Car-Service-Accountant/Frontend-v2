import { Button } from "@mui/material"
import React from "react"

const PrimaryButton = ({ text }: { text: string }) => {

    return (
        <Button sx={{
            padding: "10px 90px",
            boxShadow: "none",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            borderRadius: "8px",
        }} type="submit" color="primary" variant="contained">
            {text}
        </Button>
    )

}
export default PrimaryButton