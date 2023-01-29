# File & Folder Naming
- All file names and folders should be in camelCase

# Code Structure
- New pages should have their own folder under `src/pages/` <br>
    e.x: I am creating a homepage. The `.tsx` file would then be located here: `src/pages/home/home.tsx`.
- Components should go under components folder.

# Quotes
- Use single quotes for all quotes
- If a single quote is neccessary in a string. <br>
    Context: 
        ```console.log('Can't do this');```

    Prefer template literals: 
    <br>
        ```console.log(`Can't do this`);```
    <br>
    Over double qoutes: 
    <br>
        `console.log("Don't do this");`

# Use semicolons.

# Packages
- Consult Frontend team before adding new packages.
    - This will help keep reduce unneccessary overhead for the repo.
- When installing a new package, check if there is a types package for it as well.

# Functions
- Prefer arrow functions for anonymous callbacks
    <br>
    Prefer: 
    <br>
        `setTimeout(() => console.log('...'), 1000);`
    <br>
    Over:
    <br>
        ```
        setTimeout(function() {
            console.log('...');
        }, 1000);
        ```

    ### This does not apply to named functions in callbacks or when certain `this` behaviour is needed
- Prefer function declarations over expressions

# Clean, Readable, and Maintainable!
- POLE: Principle of Least Exposure
    <br>
    Each variable, function, etc. should have the least exposure as possible. Break up the code into blocks if variable will only be used in that block.
    <br><br>
    Prefer: 
    <br>
```
for(...) {
    ...
    {
        let temp; // temporary variable which is only used in this block.
    }
    ...
}
```
Over:
<br>
```
for(...) {
    ...
    let temp; // temporary variable which can be accessed throughout the entire for-loop.
    ...
}
```
- Variable declarations
    - Prefer `let` and `const` over `var`.
    - Use `const` when a variable is not re-assigned.
- New Line at the end of a file
- Comments when neccessary.

# Documentation
- <a href="https://tsdoc.org/">TSDoc</a>

# Braces
- Spaces before opening curly brace ({) for functions and in CSS. <br>
    Prefer: `function name() {}` over `function(){}`
- Conditional Rendering in JSX 
    <br>
    <br>
    Prefer:
    <br>
```
    {
        condition ? <><> : <><>
    }
```
<br>

Over: ```{condition ? <><> : <><>}```

- Template literals, JSX classNames, etc. <br>
    Prefer: `className={ name }` & ```console.log(`${ name }`)```
    Over: `className={name}` & ```console.log(`${name}`)```

# Return statements in JSX
- For JSX return statements that take up more than one line (including return statement), please wrap the JSX in parentheses. <br>
    Prefer: 
    <br>
        ```
        return (
            <div>
                ...
            </div>
        );
        ```
    <br>
    Over: 
    <br>
        ```
        return <div>
            ...
        </div>;
        ```

# Whitespace & Block Indentation
- Break up unrelated statements with whitespace.
