# Tips
A collection of awesome tips that may or may not be out-of-date. These are the things I *always* forget and have to google at 1am.

---

### Getting to Source code for installed packages. (1/10/2019)
1. Install a package within the Framer X Store (Favorite it if you like it as well)
2. Go to ```File > Show Project Folder``` or use the shortcut```⌥+⌘+P```
3. Back out one folder level up to in finder to ```container``` and open this folder in your favorite code editor.
4. ```node_modules > @framer``` This is where your installed packages are located. The name reflects the name within the store. Usually the ```code/``` houses all the code needed for reference.


-----

### Saving Framer X(Folder) type. (1/29/2019)
To get the folder structure file type. This is helpful version control and git! 
1. Go to ````File ````
2. Hold the option key and you will see a ````Save As```` option pop up. SMASH IT
3. Change the File Format to Framer X (Folder)

Saving your file in this manner causes some trickery within opening the file.


-----
### Adding an npm package (styled-components example)
Basic example of how to add a package to your project and even use it! In this case `styleed-components`

1. Create and save a code component
2. Open the project folder in a text editor
3. Install ````npm install styled-components```` in your directory
4. import the package into you code component file ````import styled from 'styled-components'````
5. Set up a style 
```javascript
    const AwesomeThingYouAreMaking = styled.button`  
      padding: 20px;
      border-radius: 10px;
      border: 0;
      font-size: 2em;
    `
```
6. Render the `AwesomeThingYouAreMaking`
```javascript
render() {  
  return <AwesomeThingYouAreMaking>{this.props.text}</AwesomeThingYouAreMaking>
}
```

[Further reading here](https://www.zauberware.com/en/articles/2018/how-to-create-a-styled-component-in-framerx/)

-----