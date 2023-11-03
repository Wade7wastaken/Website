import Link from "next/link";
import type { FC } from "react";

export const Navbar: FC = () => {
  // because the navbar is fixed, we have to add spacing ourselves. mt-16 should
  // be enough
  return (
    <div className="mt-16">
      <div className="bg-gray-700 fixed bottom-0 left-0 z-50 w-full p-1 flex gap-8 justify-center">
        <Link href="https://github.com/Wade7wastaken/Website">
          GitHub
        </Link>
        <Link href="https://github.com/Wade7wastaken/Website/issues/new">
          Submit an issue
        </Link>
        <Link href="mailto:david@thecallenders.com">Email me</Link>
      </div>
    </div>
  );
};
