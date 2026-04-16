import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { getPage } from "@/features/prismic/actions/getPage";
import { components } from "@/features/prismic/slices";

export const generateMetadata = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;

  const prismicPage = await getPage(uid).catch((err) => {
    console.error(err);
    return null;
  });

  return {
    title: prismicPage?.data.meta_title,
    description: prismicPage?.data.meta_description,
  };
};

export default async function Page({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;

  // Ignore asset-like requests routed through [uid], e.g. /sw.js
  if (uid.includes(".")) {
    notFound();
  }

  const prismicPage = await getPage(uid).catch((err) => {
    console.error(err);
    return null;
  });

  if (!prismicPage) {
    notFound();
  }

  return <SliceZone slices={prismicPage.data.slices} components={components} />;
}