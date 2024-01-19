import Link from "next/link";

import type { FC } from "react";

export const Navbar: FC = () => {
  // because the navbar is fixed, we have to add spacing ourselves. mt-16 should
  // be enough
  return (
    <div className="mt-16">
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center gap-8 bg-gray-700 p-1">
        <Link href="https://github.com/Wade7wastaken/Website">GitHub</Link>
        <Link href="https://github.com/Wade7wastaken/Website/issues/new">
          Submit an issue
        </Link>
        <Link href="mailto:david@thecallenders.com">Email me</Link>
      </div>
    </div>
  );
};
