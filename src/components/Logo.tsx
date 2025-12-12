'use client';
import Image from 'next/image';
import { useUIView } from '@/stores/useUIViewStore';

function Logo() {
  const { showHomeView } = useUIView();

  return (
    <Link href="/">
      <Image
        src="/images/logo.webp"
        alt="Logo"
        width={32}
        height={32}
        loading="eager"
      />
    </Link>
  );
}

export default Logo;
