# Osmo

## Overview
**Objective**    
Create a user-friendly database of catalogued formulas to view each formula's list of materials / composition, creator, date created, notes, fragrance categories, etc.

**Access**
*   Github repo: [https://github.com/wiseshrimp/osmo](https://github.com/wiseshrimp/osmo)
    
*   Live demo: [https://wiseshrimp.github.io/osmo/](https://wiseshrimp.github.io/osmo/)

## Technical Tradeoffs

* CSV file (client only) database
  * Importing CSV file led to an initial delay in load time, which is somewhat negligible right now given the fewwer number of rows but would be noticeable as the CSV file / number of rows increases.
  * Also leads to delay not only in loading the files but also in processing time. Currently need to parse the data in order to make it useable because of the lack of relationships between formulas and materials.
  * Need to load the entire CSV file, can't do progressive loading with database pagination
* Data structures
  * Map: Used two Map data structures (formula and materials) in order to prioritize search speed, which may lead to memory issues later on
    * Improvements: Either eliminate repeated strings by storing names + referencing it via indices, server-side search, pagination.
  * Searching text via searchable string: I decided to implement a searchable string, which combines the formula name and formula notes into one string separated by white spaces. I ensured that the fragrance name was first in the string (likely the most used in search by users).
    * Doesn't scale well because parses on input: On key press, splits string into an array and parses array for a match.
    * Solutions: save searchable stirng to db, use debouncing to search input, use search api, e.g. fuse.js, or do server side search

## Setup
Requirements: node.js 18
```
git clone https://github.com/wiseshrimp/osmo.git
npm ci
npm run dev
```

**Build**
```
npm run build
npm run preview
```

## Credits
Developed with ChatGPT assistance
* Helped with boilerplate (vite setup, CSV import libraries)
* Helped code toDollars and loadCsv functions in utils
* Troubleshooting occasional Typescript errors
* Helped with yml file deployment to Github Pages
