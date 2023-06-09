import React from 'react';
import { Skeleton } from "@mui/material";
export default function FeedSkeleton ()  {
    return (
        <div className='flex flex-col justify-center items-center gap-4 w-full mt-12'>
            <div className='flex flex-col justify-center gap-4 md:max-w-4xl'>
                <Skeleton variant="rounded"  height={120} />
                <Skeleton variant="text" width={400} sx={{ fontSize: '2rem' }} />
                <Skeleton variant="text" width={700} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={700} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={700} sx={{ fontSize: '1rem' }} />
                <div className='flex justify-center'>
                <Skeleton variant="rounded"  width={600} height={60} />
                </div>
            </div>
        </div>
    );
}
