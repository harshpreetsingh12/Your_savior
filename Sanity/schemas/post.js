export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
    name: 'title',
    type: 'string',
    title: 'Post title',
    validation: (Rule) => Rule.required(),
    },
    {
    name: 'short_description',
    type: 'string',
    title: 'Short description',
    },
    {
    name: 'image',
    type: 'image',
    title: 'Image of the Restaurant',
    },
    {
    name: 'locate',
    type: 'string',
    title: 'Crime location',
    validation: (Rule) => Rule.required(),
    },
    {
        name:"Date",
        title:'Date',
        type:'string',
        // to: [{type: "category"}],
    },
  ],
}
