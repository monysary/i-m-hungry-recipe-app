import Link from 'next/link'
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi'

export default function Home() {

  return (
    <div className="flex min-h-full flex-col justify-left items-center px-6 py-12 md:px-[200px] mt-[100px]">
      <div className="font-bold">
        <div className="text-[50px]">
          Cook <span className="text-orange-600">smarter,</span> not harder. <br />
        </div>
        <div className="text-gray-600 text-[30px]">
          Say goodbye to home meal planning stress with tasty recipes at your fingertips!
        </div>
      </div>
      <div className="text-[30px] mt-[100px] flex">
        <Link href='/pantry' className='flex items-center cursor-pointer'>
          <HiArrowLeft />
          <div className='ml-[20px]'>Pantry</div>
        </Link>
        <Link href='/kitchen' className='flex items-center cursor-pointer'>
          <div className="ml-[150px]">Kitchen</div>
          <HiArrowRight className='ml-[20px]' />
        </Link>
      </div>
    </div>
  )
}
