import Image from 'next/image';
import profilePicture from '@p/profilePicture.png';

const NavbarImage = ({ props }: { props: string }) => {
  return (
    <Image
      src={profilePicture}
      placeholder='blur'
      alt='Profile picture of Magnus Zoeschinger'
      className={props}
    />
  );
};

export default NavbarImage;
