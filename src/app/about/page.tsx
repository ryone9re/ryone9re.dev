import { BackButton } from '@/components/buttons/BackButton';
import Image from 'next/image';

export const metadata = {
  title: 'About | ryone9re',
  description: 'ryone9reについて'
};

export default function Page() {
  return (
    <>
      <div className='card items-center'>
        <figure>
          <Image src='/myicon.png' alt='ryone9reのアイコン' width={300} height={300} />
        </figure>
        <div className='card-body'>
          <h1 className='card-title'>ryone9re</h1>
          <p>こんにちは!! ryone9reと申す者です</p>
          <p>とある大学でCSを学んでいます</p>
          <p>高専時代は化学を専攻してました</p>
          <p>WEBアプリケーションの開発や低レイヤーが好きです</p>
          <p>🐶好きです</p>
        </div>
      </div>
      <div className='flex flex-row justify-center'>
        <BackButton />
      </div>
    </>
  );
}
