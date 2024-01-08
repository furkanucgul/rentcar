import { Skeleton } from "@mui/material"


const CarCardSkeleton = () => {
  return (
    <div className="w-[270px] h-[250px] overflow-hidden p-5 bg-primary-blue-100 my-8 rounded">
      <div className="w-full flex items-center justify-between">
        <div className="w-1/2">
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </div>
        <div className="text-end flex items-center">
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '45px', marginRight: '5px' }} />
          <Skeleton variant="circular" width={30} height={30} />
        </div>
      </div>
      <div className="mt-1 ml-1 w-5">
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </div>
      <div className="flex justify-center items-center w-full my-3">
        <Skeleton variant="rounded" width={130} height={100} />
      </div>
      <div className="flex justify-between h-8">
        <div className="w-1/4">
          <Skeleton variant="rounded" width={50} height={30} />
        </div>
        <div className="mx-1 w-1/4">
          <Skeleton variant="rounded" width={50} height={30} />
        </div>
        <div className="w-1/4">
          <Skeleton variant="rounded" width={50} height={30} />
        </div>
      </div>
    </div>
  )
}

export default CarCardSkeleton