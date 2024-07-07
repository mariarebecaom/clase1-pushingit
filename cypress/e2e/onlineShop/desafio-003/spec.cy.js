const directoryName = __dirname.replaceAll('\\','/');
const module = directoryName.split(/[/]/)[2];
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();

describe(`${suiteName} ${suiteId} - ${module}`, () => {




    
 })