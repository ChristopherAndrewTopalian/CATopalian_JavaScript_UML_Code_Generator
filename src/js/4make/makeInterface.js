// makeInterface.js

function makeInterface()
{
    injectHighlighterStyles();

    //-//

    let titleAndLink = ce('a');
    titleAndLink.href = 'https://github.com/ChristopherAndrewTopalian/CATopalian_JavaScript_UML_Code_Generator';
    titleAndLink.target = '_blank';
    titleAndLink.style.fontFamily = 'Arial';
    titleAndLink.style.fontWeight = 'bold';
    titleAndLink.textContent = 'CATopalian JavaScript UML Code Generator';
    titleAndLink.style.fontSize = '15px';
    titleAndLink.style.textDecoration = 'none';
    titleAndLink.style.color = 'rgb(170, 170, 170)';
    titleAndLink.style.lineHeight = '12px';
    ba(titleAndLink);

    //-//

    let hrUnderTitle = ce('hr');
    hrUnderTitle.style.margin = '0px';
    ba(hrUnderTitle);

    //-//

    // Main Add Node Button
    let addBtn = ce('button');
    addBtn.textContent = 'Spawn UML Node';
    addBtn.className = 'btn-style';
    addBtn.onclick = function()
    {
        // Define clickSound if it exists in our main script
        if(typeof clickSound === "function") { clickSound(); }

        // THE INVISIBLE MASTER WRAPPER (This is what actually drags)
        let wrapper = ce('div');
        wrapper.style.position = 'absolute';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center'; // Centers the UML over the Code Box
        wrapper.style.gap = '10px';
        wrapper.style.left = '50px';
        wrapper.style.top = '50px';
        ba(wrapper);

        // Apply our draggable script to the Master Wrapper
        makeElementDraggable(wrapper);

        //-//

        // THE VISUAL UML CONTAINER
        let container = ce('div');
        container.style.backgroundColor = 'rgb(40, 40, 40)';
        container.style.border = '2px solid white';
        container.style.padding = '10px';
        container.style.minWidth = '200px';
        wrapper.append(container);

        //-//

        // The Collapsible Wrapper
        let theDetails = ce('details');
        theDetails.open = true; // Spawns open by default
        container.append(theDetails);

        //-//

        // The Class Name (Summary)
        let theSummary = ce('summary');
        theSummary.textContent = 'NewComponent';
        theSummary.contentEditable = 'true';
        theSummary.style.fontWeight = 'bold';
        theSummary.style.cursor = 'pointer';
        theSummary.style.color = 'cyan';
        theSummary.style.paddingTop = '2px';
        theSummary.style.paddingBottom = '2px';
        theSummary.style.paddingRight = '7px';
        
        theSummary.onclick = function()
        { 
            if(typeof clickSound2 === "function") { clickSound2(); } 
        };
        // LIVE UPDATE HOOK:
        theSummary.onkeyup = function()
        {
            generateLiveCode();
        };
        theDetails.append(theSummary);

        // The Body (Holds Properties and Methods)
        let nodeBody = ce('div');
        theDetails.append(nodeBody);

        //-//

        // PROPERTIES SECTION
        let propertiesContainer = ce('div');
        nodeBody.append(propertiesContainer);

        //-//

        let addPropertyBtn = ce('button');
        addPropertyBtn.textContent = '+ Property';
        addPropertyBtn.style.marginTop = '5px';
        addPropertyBtn.onclick = function()
        {
            if(typeof clickSound === "function") { clickSound(); }

            let newProperty = ce('div');
            newProperty.textContent = '- newProperty';
            newProperty.style.border = 'solid 1px rgb(222, 175, 255)';
            newProperty.contentEditable = 'true';
            newProperty.style.color = 'rgb(222, 175, 255)';
            newProperty.style.paddingRight = '4px';
            
            newProperty.onclick = function() { 
                if(typeof clickSound3 === "function") { clickSound3(); } 
            };
            // LIVE UPDATE HOOK:
            newProperty.onkeyup = function() { generateLiveCode(); };
            
            propertiesContainer.append(newProperty);
            generateLiveCode(); // Update the code box instantly upon adding
        };
        nodeBody.append(addPropertyBtn);

        //-//

        nodeBody.append(ce('hr'));

        //-//

        // METHODS SECTION
        let methodsContainer = ce('div');
        nodeBody.append(methodsContainer);

        //-//

        let addMethodBtn = ce('button');
        addMethodBtn.textContent = '+ Method';
        addMethodBtn.style.marginTop = '5px';
        addMethodBtn.onclick = function()
        {
            if(typeof clickSound === "function") { clickSound(); }

            let newMethod = ce('div');
            newMethod.textContent = '+ newMethod()';
            newMethod.style.border = 'solid 1px rgb(255, 255, 0)';
            newMethod.style.color = 'rgb(255, 255, 0)';
            newMethod.contentEditable = 'true';
            newMethod.style.paddingRight = '4px';
            
            newMethod.onclick = function() { 
                if(typeof clickSound3 === "function") { clickSound3(); } 
            };
            // LIVE UPDATE HOOK:
            newMethod.onkeyup = function()
            {
                generateLiveCode();
            };
            
            methodsContainer.append(newMethod);
            generateLiveCode(); // Update the code box instantly upon adding
        };
        nodeBody.append(addMethodBtn);

        //----//

        // ==========================================
        // 3. THE CODE BOX & COPY BUTTON
        // ==========================================
        
        let copyBtn = ce('button');
        copyBtn.textContent = 'Copy Code';
        copyBtn.style.marginBottom = '5px';
        copyBtn.style.cursor = 'pointer';
        copyBtn.onclick = function()
        {
            if(typeof clickSound === "function") { clickSound(); }
            
            // Write the pure, unformatted text to the clipboard
            navigator.clipboard.writeText(codeBox.textContent).then(() => 
            {
                // Visual feedback that it worked
                copyBtn.textContent = 'Copied!';
                copyBtn.style.color = 'rgb(0, 255, 255)'; // Flash green
                
                setTimeout(() => { 
                    copyBtn.textContent = 'Copy Code'; 
                    copyBtn.style.color = ''; // Reset color
                }, 2000);
            });
        };
        wrapper.append(copyBtn);

        //-//

        // THE CODE BOX
        let codeBox = ce('pre');
        codeBox.className = "custom-code"; // This automatically hooks into our colorer CSS
        codeBox.style.width = '500px';  // Ensure it is wider than the UML box
        codeBox.style.margin = '0px';      // Remove default pre margins so it aligns nicely
        wrapper.append(codeBox);

        //-----//

        // THE LIVE GENERATOR ENGINE

        function generateLiveCode()
        {
            // Read the title
            let className = theSummary.textContent.trim();
            if(!className) { className = "UnnamedClass"; }

            // Extract the pure text of the Properties (stripping the "- ")
            let props = [];

            for(let i = 0; i < propertiesContainer.children.length; i++) 
            {
                let cleanProp = propertiesContainer.children[i].textContent.replace('-', '').trim();

                if(cleanProp !== "")
                {
                    props.push(cleanProp);
                }
            }

            // Extract the pure text of the Methods (stripping the "+ " and "()")
            let methods = [];

            for(let i = 0; i < methodsContainer.children.length; i++) 
            {
                let cleanMethod = methodsContainer.children[i].textContent.replace('+', '').replace('()', '').trim();

                if(cleanMethod !== "")
                {
                    methods.push(cleanMethod);
                }
            }

            // Build the raw text blueprint for the class
            let rawCode = `class ${className}\n{\n`;
            
            let constructorParams = [];
            let constructorBody = "";

            // PARSE PROPERTIES
            props.forEach(p => 
            {
                let propName = "";
                let defaultValue = "";
                let isInternalState = false;

                // Check for an equals sign (Internal State)
                if (p.includes('=')) 
                {
                    isInternalState = true;
                    let parts = p.split('=');
                    
                    // Extract the name (strip out the type if the colon is on the left)
                    propName = parts[0].split(':')[0].trim();

                    // Extract the default value (strip out the type if the colon is on the right)
                    defaultValue = parts[1].split(':')[0].trim(); 
                } 
                else 
                {
                    // Injected Parameter (strip out the type if there is a colon)
                    propName = p.split(':')[0].trim();
                }

                // Write the JavaScript
                if (isInternalState) 
                {
                    constructorBody += `        this.${propName} = ${defaultValue};\n`;
                } 
                else 
                {
                    constructorParams.push(propName);
                    constructorBody += `        this.${propName} = ${propName};\n`;
                }
            });

            rawCode += `    constructor(${constructorParams.join(', ')})\n    {\n`;
            rawCode += constructorBody;
            rawCode += `    }\n`;

            // PARSE METHODS
            if(methods.length > 0) { rawCode += `\n`; }
            
            methods.forEach(m => 
            {
                // Strip out the data type if they typed "update() : void"
                let cleanMethodName = m.split(':')[0].trim();
                
                rawCode += `    ${cleanMethodName}()\n    {\n        // Add Logic Here\n    }\n\n`;
            });

            rawCode += `}`;

            // FIRE THE HIGHLIGHTER IN REAL TIME
            // We pass 'js' to use our JavaScript ruleset
            if(typeof processCodeString === "function")
            {
                // This runs our regex rules and outputs the colorful HTML
                codeBox.innerHTML = processCodeString(rawCode, 'js'); 
            }
            else
            {
                // If it's white, it means the browser can't find the colorer script
                codeBox.textContent = rawCode; 
                console.log("Error: processCodeString is not linked properly.");
            }
        }

        // Fire the engine once to populate the code box the moment the node spawns
        generateLiveCode();
    };
    ba(addBtn);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

