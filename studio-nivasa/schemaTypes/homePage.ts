import {defineField, defineType} from 'sanity'

// Singleton: only one "homePage" document should exist.
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote text',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'heroHeading'},
  },
})
