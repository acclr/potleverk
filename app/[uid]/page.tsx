import { getPage } from "@/features/prismic/actions/getPage";
import { components } from "@/features/prismic/slices";
import { SliceZone } from "@prismicio/react";

export default async function Page({params}: { params: Promise<{ uid: string }> }) {
  const { uid } = (await params);
  const prismicPage = await getPage(uid).catch(err => {
    console.error(err);
    return null;
  });

  return (
    <SliceZone slices={prismicPage?.data.slices} components={components} />
  )
}