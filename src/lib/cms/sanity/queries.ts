import groq from "groq";

const projectFieldsQuery = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage{ alt, asset->{ url, metadata{ dimensions, lqip } } },
  gallery[]{ alt, asset->{ url, metadata{ dimensions, lqip } } },
  location,
  year,
  categories
`;

export const listProjectsQuery = groq`
  *[_type == "project"] | order(year desc) { ${projectFieldsQuery} }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{ ${projectFieldsQuery} }
`;
