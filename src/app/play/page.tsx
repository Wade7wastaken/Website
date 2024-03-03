import { Suspense, type FC } from "react";

import { PlayPage } from "@components/PlayPage";

const Home: FC = () => {
  // Suspense needed here so the entire /play page isn't client rendered
  return (
    <Suspense>
      <PlayPage />
    </Suspense>
  );
};

export default Home;
