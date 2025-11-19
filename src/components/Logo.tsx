import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        loading="eager"
      />
    </Link>
  );
}

export default Logo;
