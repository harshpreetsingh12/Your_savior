export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
      name: 'comment',
      title: 'Comment', 
      type: 'string',
      },
      {
      name: 'username',
      title: 'Username',
      type: 'string',
      },
      {
      name: 'datee',
      title: 'Date',
      type: 'string',
      },
    //   {
    //   name: 'image',
    //   type: 'image',
    //   title: 'Image of the Restaurant',
    //   },
      {
      name: 'Userpost',
      title: 'UserPost',
      discription: 'Reference the Post the comment is assosiated to:',
      type: 'reference',
      to:[{type:'userpost'},{type:'post'}],
      },
    
    ],
  }
  