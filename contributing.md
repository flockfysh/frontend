<section id="#fileNaming">
    <h1>File & Folder Naming</h1>
        - All file names and folders should be in camelCase

    <h1>Code Structure</h1>
        - New pages should have their own folder under `src/pages/`
            e.x: I am creating a homepage. 
                src/
                    pages/
                        home/
                            **home.tsx**
        - Components should go under components folder.
</section>

<section id="#code">
    <h1>Quotes</h1>
        - Use single quotes for all quotes
        - If a single quote is neccessary in a string
            context: `console.log('Can't do this');`

            Prefer template literals:
                `console.log(`Can't do this`);`
            Over double qoutes:
                `console.log("Don't do this");`

    <h1>Use semicolons.</h1>

    <h1>Packages</h1>
        - Consult Frontend team before adding new packages.
            - This will help keep reduce unneccessary overhead for the repo.
        - When installing a new package, check if there is a types package for it as well.

    <h1>Functions</h1>
        - Prefer arrow functions for anonymous callbacks
            Prefer: setTimeout(() => console.log('...'), 1000);
            Over: setTimeout(function() {
                console.log('...');
            }, 1000);

            **This does not apply to named functions in callbacks or when certain `this` behaviour is needed**
        - Prefer function declarations over expressions
    
    <h1>Clean, Readable, and Maintainable!</h1>
        - POLE: Principle of Least Exposure
            Each variable, function, etc. should have the least exposure as possible. Break up the code into blocks if variable will only be used in that block.
                Prefer: 
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

    <h1>Documentation</h1>
        - <a href="https://tsdoc.org/">TSDoc</a>
</section>

<section id="#formatting">
    <h1>Braces</h1>
        - Spaces before opening curly brace ({) for functions and in CSS.
            Prefer: `function name() {}` over `function(){}`
        - Conditional Rendering in JSX
            Prefer:
                ```
                    {
                        condition ? <><> : <><>
                    }
                ```
            Over: ``{condition ? <><> : <><>}```
        - Template literals, JSX classNames, etc.
            Prefer: `className={ name }` & `console.log(`${ name }`)`
            Over: `className={name}` & `console.log(`${name}`)`

    <h1>Return statements in JSX</h1>
        - For JSX return statements that take up more than one line (including return statement), please wrap the JSX in parentheses.
            Prefer: 
                ```
                return (
                    <div>
                        ...
                    </div>
                );
                ```
            Over: 
                ```
                return <div>
                    ...
                </div>;
                ```

    <h1>Whitespace & Block Indentation</h1>
        - Break up unrelated statements with whitespace.
</section>
