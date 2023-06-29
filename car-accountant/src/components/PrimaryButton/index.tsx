import { Button } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"

const PrimaryButton = ({ text, link }: { text: string, link: string }) => {
    const router = useRouter()

    return (
        <Button sx={{
            padding: "10px 90px",
            boxShadow: "none",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            borderRadius: "8px",
        }} type="submit" color="primary" variant="contained" onClick={() => router.push(link)} >
            {text}
        </Button>
    )

}
export default PrimaryButton