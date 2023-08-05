import type { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="bg-gray-700 fixed bottom-0 left-0 z-50 w-full p-1 flex gap-8 justify-center">
      <a href="https://github.com/Wade7wastaken/TrulyUnblockedGames">Github</a>
      <a href="https://github.com/Wade7wastaken/TrulyUnblockedGames/issues/new">
        I have something to suggest
      </a>
      <a href="mailto:david@thecallenders.com">Email me</a>
    </div>
  );
};
