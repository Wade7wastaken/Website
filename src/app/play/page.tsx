import { Suspense, type FC } from "react";

import { PlayPage } from "@components/PlayPage";

const Home: FC = () => {
  return (
    <Suspense>
      <PlayPage />
    </Suspense>
  );
};

export default Home;
