import {defineField, defineType} from 'sanity'

// Singleton: only one "servicesPage" document should exist.
export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'process',
      title: 'Process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
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
