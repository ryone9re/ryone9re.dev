import { GitHub } from '@/components/icons/GitHub';
import { Twitter } from '@/components/icons/Twitter';

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
