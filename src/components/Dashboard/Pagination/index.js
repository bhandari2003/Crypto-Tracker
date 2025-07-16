import * as React from 'react';
import './style.css';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

export default function PaginationComponent({ page, handlePageChange }) {


    return (
        <div className='page-comp'>
            <Pagination count={10} page={page}
                onChange={(event, value) => handlePageChange(event, value)}
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "var(--white)",
                        border: "1px solid var(--grey)",
                        "&:hover": {
                            backgroundColor: "var(--blue)",
                            color: "#fff",
                        },
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "var(--blue) !important",
                        color: "#fff !important",
                        borderColor: "var(--blue) !important",
                        "&:hover": {
                            backgroundColor: "var(--blue) !important", // keep blue even on hover
                            color: "#fff !important",
                        },
                    },
                    "& .MuiPaginationItem-ellipsis": {
                        border: "0px solid var(--grey) !important",
                    },
                }}

            />
        </div>
    );
}
