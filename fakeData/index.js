export default {
  authors: [
    {
      id: 143,
      name: 'Anh Khoa'
    },    
    {
      id: 298,
      name: 'Hồ Xuân Hương'
    }    
  ],

  folders: [
    {
      id: '1',
      name: 'Home',
      createdAt: '2024-03-14T03:42:13Z',
      authorId: 143,
    },
    {
      id: '2',
      name: 'New Folder',
      createdAt: '2024-02-14T03:42:13Z',
      authorId: 143,
    },
    {
      id: '3',
      name: 'Work',
      createdAt: '2024-01-14T03:42:13Z',
      authorId: 298,
    },
  ],

  notes: [
    {
      id: '123',
      content: '<p>Go to supermarket</p>',
      folderId : '1'
    },
    {
      id: '234',
      content: '<p>Go to park</p>',
      folderId : '1'
    },
    {
      id: '345',
      content: '<p>Go to school</p>',
      folderId : '2'
    },
  ]
}
