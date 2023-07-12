import { Box, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';

const BoxSpawner = ({ boxes }: any | any[]) => {
    const [visibleBoxes, setVisibleBoxes] = useState<any[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleBoxes((prevVisibleBoxes) => {
                if (prevVisibleBoxes.length < boxes.length && prevVisibleBoxes.length < 7) {
                    return [...prevVisibleBoxes, boxes[prevVisibleBoxes.length]];
                } else {
                    clearInterval(timer);
                    return prevVisibleBoxes;
                }
            });
        }, 500); // Adjust the delay between each box appearance here (in milliseconds)

        return () => {
            clearInterval(timer);
        };
    }, [boxes]);

    return (
        <Box>
            {visibleBoxes.map((box, index) => (
                <Fade in={true} key={index}>
                    <Box>{box}</Box>
                </Fade>
            ))}
        </Box>
    );
};

export default BoxSpawner;