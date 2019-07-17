/** Example file/folder data. */
export const files = [
  {
    name: 'Dzień 29',
    type: 'folder',
    children: [
      {
        name: 'Zlecenie',
        type: 'folder',
        children: [
          {
            name: 'Przedza',
            type: 'folder',
            children: [
              { name: 'przedza', type: 'file' },
              { name: 'waga', type: 'file' }
            ]
          },
          { name: 'Pozycja', type: 'folder' }
        ]
      }
    ]
  },
  {
    name: 'angular',
    type: 'folder',
    children: [
      {
        name: 'packages',
        type: 'folder',
        children: [
          { name: '.travis.yml', type: 'file' },
          { name: 'firebase.json', type: 'file' }
        ]
      },
      { name: 'package.json', type: 'file' }
    ]
  },
  {
    name: 'angularjs',
    type: 'folder',
    children: [
      { name: 'gulpfile.js', type: 'file' },
      { name: 'README.md', type: 'file' }
    ]
  }
];
