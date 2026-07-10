import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token, isSanityConfigured } from "./env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

export const adminClient =
  isSanityConfigured && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token,
      })
    : client;
