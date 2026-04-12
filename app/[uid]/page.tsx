import { notFound } from "next/navigation";
import { getPage } from "@/features/prismic/actions/getPage";
import { components } from "@/features/prismic/slices";
import { SliceZone } from "@prismicio/react";
export default async function Page({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  // Ignore asset-like requests routed through [uid], e.g. /sw.js
  if (uid.includes(".")) {
    notFound();
  }
  const prismicPage = await getPage(uid);
  if (!prismicPage) {
    notFound();
  }
  return <SliceZone slices={prismicPage.data.slices} components={components} />;
}