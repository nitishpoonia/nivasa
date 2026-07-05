export type Office = {
  city: string;
  addressLines: string[];
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  studioName: string;
  tagline: string;
  accentColor: string;
  email: string;
  phone: string;
  offices: Office[];
  socialLinks: SocialLink[];
};
