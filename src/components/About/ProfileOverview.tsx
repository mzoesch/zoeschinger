import ProfilePictureImage from './ProfilePictureImage';
import { GoMail, GoLocation } from 'react-icons/go';

const ProfileOverview = () => {
  return (
    <>
      <div>
        {/* Profile picture and names */}
        <div
          className='
          flex items-center gap-4
          sm:block
          lg:block
          2xl:block
        
          mx-4
        '
        >
          <ProfilePictureImage
            additionalArguments='
            rounded-full
            
            max-w-[6rem]

            sm:max-w-full
            sm:w-72
            lg:w-80'
          />
          <div className='sm:mt-5'>
            <h3
              className='
            text-primary dark:text-primaryLight

            text-2xl font-extrabold
            '
            >
              Magnus Zoeschinger
            </h3>
            <h4
              className='
            text-gray-700 dark:text-gray-400

            text-xl font-mono font-thin
            '
            >
              mzoesch
            </h4>
          </div>
        </div>
        {/* More information */}
        <div
          className='
        mt-5 mx-5
        sm:mx-0 sm:ml-3 sm:mr-2
        
        text-sm'
        >
          <div className='flex justify-start gap-2 items-center'>
            <GoLocation
              className='
            text-gray-700 dark:text-gray-300
            text-xl w-1/6
            '
            />
            <p
              className='
            text-gray-700 dark:text-white
            
            font-extralight w-5/6
            '
            >
              Germany, Bavaria, Munich
            </p>
          </div>
          <div className='flex justify-start gap-2 items-start mt-2'>
            <GoMail
              className='
            text-gray-700 dark:text-gray-300
            
            text-xl w-1/6 mt-0.5
            '
            />
            <p
              className='
            text-gray-700 dark:text-white
            
            truncate
            font-extralight w-5/6
            '
            >
              magnus.zoeschinger@zoeschinger.de
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOverview;
