import React from 'react';
import { Skeleton } from "@mui/material";
export default function GenerateRecipeSkeleton ()  {
    return (
        <div className='flex flex-col gap-4 w-full'>
        <Skeleton variant="text" width={400} sx={{ fontSize: '2rem' }} />
        <Skeleton variant="text" width={700} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" width={700} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" width={700} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rounded"  height={60} />
        <Skeleton variant="rounded"  height={60} />
        </div>
    );
}

