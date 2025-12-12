import Image from 'next/image';
import Link from 'next/link';

function Logo() {
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
