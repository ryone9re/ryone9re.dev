import { GitHub } from './Github';
import { Twitter } from './Twitter';

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
