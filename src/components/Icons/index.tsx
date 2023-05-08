import { GitHub } from '@/components/Icons/GitHub';
import { Twitter } from '@/components/Icons/Twitter';

export const SNSIcons = () => {
  return (
    <>
      <div className='flex w-36 flex-row justify-between'>
        <Twitter />
        <GitHub />
      </div>
    </>
  );
};
