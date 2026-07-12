import {defineField, defineType} from 'sanity'

// Singleton: only one "contactPage" document should exist.
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
  ],
  preview: {
    select: {title: 'heading'},
  },
})
