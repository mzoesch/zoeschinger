import Image from 'next/image';
import ProfilePictureI from '@pub/ProfilePicture.png';
import React from 'react';

interface props {
  additionalArguments?: string;
  children?: any;
}

const ProfilePictureImage: React.FC<props> = ({
  additionalArguments,
  children,
}) => {
  const classNameArgs = `
  ${additionalArguments}
  w-auto h-auto
  `;

  return (
    <>
      <Image
        src={ProfilePictureI}
        alt='Profile picture of Magnus Zoeschinger'
        className={classNameArgs}
        placeholder='blur'
        priority
      />
      {children}
    </>
  );
};

export default ProfilePictureImage;
