
# Tailwind to CSS 

Tailwind classes definitions may tend to get extensive and unreaddable sometimes.

Convert your markup language files (HTML, JSP) that use Tailwind to its pure CSS Vanilla definitions.

This script takes your files and for each one it returns a new markup lang file and another CSS file with classes referring to the new file.



## Usage

node converter.js file1 ... fileN
## Configuration

```javascript
<!-- config.js -->

<!-- Output folder -->
const outFolder = "./out/";

<!-- Write which types of nodes you want to analize and replace -->
const types = [
    "body",
    "div",
    "button",
    ....
]

```


## Requirements

Node (and NPM)

JSSoup (npm i jssoup)
## Authors

- [@daguichi](https://www.github.com/daguichi)

