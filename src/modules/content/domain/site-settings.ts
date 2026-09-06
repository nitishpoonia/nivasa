export type Office = {
  city: string;
  addressLines: string[];
};

export type SocialPlatform = "facebook" | "instagram" | "whatsapp";

export type SocialLink = {
  platform: SocialPlatform;
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
