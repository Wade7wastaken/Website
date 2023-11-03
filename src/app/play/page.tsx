import { type FC } from "react";

import { PlayPage } from "@components/PlayPage";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

const Home: FC<Props> = ({ searchParams }) => {
  return <PlayPage searchParams={searchParams} />;
};

export default Home;
