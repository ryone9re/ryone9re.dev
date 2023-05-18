'use client';

type BlogPostTitleProps = {
  thumbnail: string;
  title: string;
};

export function BlogPostTitle({ thumbnail, title }: BlogPostTitleProps) {
  return (
    <>
      <div className='hero w-full'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-6xl'>{thumbnail}</h1>
            <p className='whitespace-normal break-words py-6 text-4xl'>{title}</p>
          </div>
        </div>
      </div>
    </>
  );
}
