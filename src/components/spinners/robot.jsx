import { GiCampCookingPot } from "react-icons/gi";

const RobotCookingLoader = () => {
  return (
    <div className='flex flex-row gap-2 w-full text-center items-center justify-center bg-stone-800 h-full text-[rgb(8, 91, 209)]'>
      <div className='robot pt-56 absolute mr-36  '>
        <GiCampCookingPot size={100} className='text-orange-500' />
      </div>
      <div className='robot'>
        <div className='face'></div>
        <div className='head'></div>
        <div className='body'></div>
        <div className='left-hand'></div>
        <div className='right-hand'></div>
        <div className='eye1'></div>
        <div className='eye2'></div>
      </div>
    </div>
  );
};

export default RobotCookingLoader;
