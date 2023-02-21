import ProfilePictureImage from './ProfilePictureImage';
import { GoMail, GoLocation } from 'react-icons/go';
import styles from '@s/home/home.module.css';

const ProfileOverview = () => {
  return (
    <>
      <div className=''>
        {/* Profile picture and names */}
        <div
          className='
          flex items-center gap-4
          sm:block
          
          mx-4
        '
        >
          <ProfilePictureImage
            additionalArguments={styles.profile_picture_additional_arguments}
          />
          <div className='sm:mt-5'>
            <h3 className={styles.profile_overview_name}>Magnus Zoeschinger</h3>
            <h4 className={styles.profile_overview_username}>mzoesch</h4>
          </div>
        </div>
        {/* More information */}
        <div className={styles.profile_overview_more_information}>
          <div className='flex justify-start gap-2 items-center'>
            <GoLocation className={styles.profile_overview_location_icon} />
            <p className={styles.profile_overview_location}>
              Germany, Bavaria, Munich
            </p>
          </div>
          <div className='flex justify-start gap-2 items-start mt-2'>
            <GoMail className={styles.profile_overview_email_icon} />
            <p className={styles.profile_overview_email}>just some email</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOverview;
