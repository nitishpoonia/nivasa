import groq from "groq";

const imageFieldsQuery = groq`alt, asset->{ url, metadata{ dimensions, lqip } }`;

const projectFieldsQuery = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  description,
  coverImage{ ${imageFieldsQuery} },
  gallery[]{ ${imageFieldsQuery} },
  location,
  year,
  categories
`;

export const listProjectsQuery = groq`
  *[_type == "project" && (!defined($category) || $category in categories)] | order(year desc) { ${projectFieldsQuery} }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{ ${projectFieldsQuery} }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    studioName,
    tagline,
    accentColor,
    email,
    phone,
    offices[]{ city, addressLines },
    socialLinks[]{ label, url }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroEyebrow,
    heroHeading,
    heroSubtext,
    heroImage{ ${imageFieldsQuery} },
    quoteText
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    heading,
    portraitImage{ ${imageFieldsQuery} },
    practiceParagraphs,
    principles[]{ title, body }
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0]{
    heading,
    intro,
    process[]{ title, body }
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    heading,
    intro
  }
`;

export const listServicesQuery = groq`
  *[_type == "service"] | order(order asc){ _id, name, description, tags }
`;

export const listTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc){ _id, name, role, photo{ ${imageFieldsQuery} } }
`;

export const listAwardsQuery = groq`
  *[_type == "award"] | order(order asc){ _id, year, title, organization }
`;
