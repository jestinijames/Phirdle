import React from 'react';
import Div100vh from 'react-div-100vh';
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export function InfoModal({ isOpen, handleClose }: Props) {
  return (
    <Div100vh>
      <div className='flex h-full flex-col'>
        <div className='mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2'>
          <div>InfoModal</div>
        </div>
      </div>
    </Div100vh>
  );
}
