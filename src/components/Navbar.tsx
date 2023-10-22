import Link from "next/link";
import type { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="bg-gray-700 fixed bottom-0 left-0 z-50 w-full p-1 flex gap-8 justify-center">
      <Link href="https://github.com/Wade7wastaken/TrulyUnblockedGames">
        GitHub
      </Link>
      <Link href="https://github.com/Wade7wastaken/TrulyUnblockedGames/issues/new">
        Submit an issue
      </Link>
      <Link href="mailto:david@thecallenders.com">Email me</Link>
    </div>
  );
};
