import {defineField, defineType} from 'sanity'

// Singleton: only one "siteSettings" document should exist.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Studio name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      type: 'string',
      description: 'Hex color, e.g. #A56A45',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'office',
          fields: [
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'addressLines',
              title: 'Address lines',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'studioName'},
  },
})
