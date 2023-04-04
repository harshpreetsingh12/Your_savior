export default {
  name: 'userpost',
  title: 'UserPost',
  type: 'document',
  fields: [
    {
    name: 'Username',
    type: 'string',
    title: 'username',
    validation: (Rule) => Rule.required(),
    },
    {
      name:'blockPost',
      title:'block Post',
      description:'Admin control: Toggle if tweet is deemed inappropriate',
      type:'boolean',
      // initialValue: false
    },
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
