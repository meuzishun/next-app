import { Github } from 'lucide-react';
import Link from 'next/link';
import { TeamMembers } from './ui/team-members';

export default function Footer() {
  return (
    <footer className="py-2 text-center text-xs bg-chingu-green-600 text-white z-20 flex justify-center items-center gap-5">
      <p>© Chingu {new Date().getUTCFullYear()}</p>
      <p>|</p>
      <Link href="https://github.com/chingu-voyages/V58-tier3-team-30">
        <div className="flex gap-1">
          <Github size={16} />
          <p>Repo</p>
        </div>
      </Link>
      <p>|</p>
      <TeamMembers />
    </footer>
  );
}
