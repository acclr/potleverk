import { SliceZone } from "@prismicio/react";
import { components } from "@/features/prismic/slices";
import { getPage } from "@/features/prismic/actions/getPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Potleverk - CNC, design og trykkeri-tjenester",
  description: "CNC, design og trykkeri-tjenester",
  icons: "favicon.ico",
};
export default async function Home() {
  const prismicPage = await getPage("home");

  return (
    <SliceZone slices={prismicPage?.data?.slices} components={components} />
  );
}
