import { ThreeDots } from "react-loader-spinner";
import React from "react";

export default function ThreeDotsSpinner() {
  return (
    <ThreeDots
      height='80'
      width='80'
      radius='9'
      color='#e15b64'
      ariaLabel='three-dots-loading'
      wrapperStyle={{}}
      wrapperClassName=''
      visible={true}
    />
  );
}
