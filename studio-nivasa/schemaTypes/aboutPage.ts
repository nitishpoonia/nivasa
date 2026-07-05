import {defineField, defineType} from 'sanity'

// Singleton: only one "aboutPage" document should exist.
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait image',
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
      name: 'practiceParagraphs',
      title: 'Practice paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({
      name: 'principles',
      title: 'Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'principle',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'body', title: 'Body', type: 'string'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
