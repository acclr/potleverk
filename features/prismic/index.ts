import * as prismic from "@prismicio/client";
// import * as prismicNext from "@prismicio/next";
import sm from "../../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const { repositoryName } = sm;

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 *
 * @type {prismic.ClientConfig['routes']}
 */
const routes = [
  {
    type: "localization",
    path: "/"
  }
];

// WIP: Look into this
// process.env.NODE_ENV === "production" ? { next: { tags: ["prismic"] }, cache: "force-cache" } : { next: { revalidate: 5 } },

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismic.ClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config?: any) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    lang: "nb-no",
    fetchOptions:
      // process.env.NODE_ENV === "production" ? { next: { tags: ["prismic"] }, cache: "no-cache" } : { next: { revalidate: 5 } },
      process.env.NODE_ENV === "production" ? { next: { revalidate: 30 } } : { next: { revalidate: 5 } },
    ...config
  });

  // prismicNext.enableAutoPreviews({ client });

  return client;
};
