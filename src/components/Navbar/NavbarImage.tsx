import Image from 'next/image';
import navbarImage from '@pub/ProfilePicture.png';
import React from 'react';

interface props {
  hideArguments?: string;
}

const NavbarImage: React.FC<props> = ({ hideArguments }) => {
  const classNameArgs = `${hideArguments} h-8 w-auto`;

  return (
    // Ignoring unsupported entryTypes: largest-contentful-paint
    // Firefox does not support this feature yet
    <Image
      src={navbarImage}
      alt='NavbarImage of this website'
      className={classNameArgs}
      // blurDataURL="data:..." automatically provided
      placeholder='blur' // Optional blur-up while loading
      priority
    />
  );
};

export default NavbarImage;
