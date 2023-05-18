import { GitHubButton } from '@/components/icons/GitHub';
import { TwitterButton } from '@/components/icons/Twitter';

export const SNSIcons = () => {
  return (
    <>
      <div className='flex w-36 flex-row justify-between'>
        <TwitterButton />
        <GitHubButton />
      </div>
    </>
  );
};
