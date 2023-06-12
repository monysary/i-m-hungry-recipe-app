import { Skeleton } from "@mui/material"

export default function FeedSkeleton() {
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full px-4 '>
      <div className='flex flex-col w-full gap-4'>
        <Skeleton variant='rounded' height={100} />
        <Skeleton variant='text' width={200} sx={{ fontSize: "2rem" }} />
        <Skeleton variant='text' width={300} sx={{ fontSize: "1rem" }} />
        <Skeleton variant='text' width={300} sx={{ fontSize: "1rem" }} />
        <Skeleton variant='text' width={300} sx={{ fontSize: "1rem" }} />
      </div>
    </div>
  )
}
