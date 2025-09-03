import { SliceZone } from "@prismicio/react";
import { components } from "@/features/prismic/slices";
import { getPage } from "@/features/prismic/actions/getPage";

export default async function Home() {
  const prismicPage = await getPage("home");

  return (
    <SliceZone slices={prismicPage?.data?.slices} components={components} />
  );
}
