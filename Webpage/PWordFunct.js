// Listeners go up here
window.addEventListener("DOMContentLoaded", (event) => {	// Waits for DOM load
    const fileSelect = document.getElementById("fileSelect");
    fileSelect.addEventListener("change",getFile);
});

function createCredContainer(number, empty)    // Number is used to numerate Id's
{
    // CREATES HTML FOR CREDENTIALS
    // Very long, but there does not appear to be an alternative
    const accordion = document.createElement("div");
    accordion.className = "accordion";
    accordion.id = "container" + number;

    const div = document.getElementById("passwordDiv");
    div.appendChild(accordion);

    const accordItem = document.createElement("div");
    accordItem.className = "accordion-item";
    accordion.appendChild(accordItem);

    const accordHead = document.createElement("h2");
    accordHead.className = "accordion-header";
    accordItem.appendChild(accordHead);

    const accordBtn = document.createElement("button");    // Collapse button
    accordBtn.type = "button";
    accordBtn.id = "heading" + number;
    accordBtn.className = "accordion-button collapsed bg-dark text-white";
    accordBtn.dataset.bsToggle = "collapse";
    accordBtn.dataset.bsTarget = "#collapse" + number;
    if (!empty)
    {
        accordBtn.textContent = "PLACEHOLDER";
    }
    else    // For credential creation
    {
        accordBtn.textContent = "New Entry";
    }
    accordHead.appendChild(accordBtn);

    const accordCollapse = document.createElement("div");
    accordCollapse.id = "collapse" + number;               // This must match bsTarget
    accordCollapse.className = "accordion-collapse collapse";
    accordCollapse.dataset.bsParent = "#container" + number; // This must match accordion's value
    accordItem.appendChild(accordCollapse);

    const accordCard = document.createElement("div");
    accordCard.className = "card-body bg-dark text-white";
    accordCollapse.appendChild(accordCard);

    const accordForm = document.createElement("form");
    accordCard.appendChild(accordForm);

    if (empty)
    {
        const nameRow = document.createElement("div");
        nameRow.className = "row";
        accordForm.appendChild(nameRow);

        const name = document.createElement("label");
        name.className = "form-label";
        name.for = "name" + number;
        name.innerText = "Site Name:";
        nameRow.appendChild(name);

        const nameInput = document.createElement("input");
        nameInput.className = "form-control";
        nameInput.id = "name" + number;
        nameInput.placeholder = "SITE NAME";
        nameRow.appendChild(nameInput);
    }

    const accordRow = document.createElement("div");
    accordRow.className = "row";
    accordForm.appendChild(accordRow);


    const colUser = document.createElement("div");  // Columns do not share naming convention, rename?
    colUser.className = "col-md";
    accordRow.appendChild(colUser);

    const userLabel = document.createElement("label");
    userLabel.className = "form-label";
    userLabel.for = "username" + number;
    userLabel.innerText = "Username:";
    colUser.appendChild(userLabel);

    const userInput = document.createElement("input");  // Username textbox, no value yet
    userInput.type = "text";
    userInput.className = "form-control";
    userInput.id = "username" + number;
    userInput.placeholder = "USERNAME";
    colUser.appendChild(userInput);


    const colPword = document.createElement("div");
    colPword.className = "col-md";
    accordRow.appendChild(colPword);

    const pwordLabel = document.createElement("label");
    pwordLabel.className = "form-label";
    pwordLabel.for = "password" + number;
    pwordLabel.innerText = "Password:";
    colPword.appendChild(pwordLabel);

    const pwordInput = document.createElement("input"); // Password textbox, no value
    pwordInput.type = "password";       // Note obfuscation, switch to text when shown
    pwordInput.className = "form-control";
    pwordInput.id = "password" + number;
    pwordInput.placeholder = "PASSWORD";
    colPword.appendChild(pwordInput);


    const colBtns = document.createElement("div");
    colBtns.className = "col-md-2";
    accordRow.appendChild(colBtns);
    if (!empty)
    {
        const checkLabel = document.createElement("label");
        checkLabel.innerText = "Show Password ";
        colBtns.appendChild(checkLabel);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = "";
        checkbox.id = "showWord" + number;
        checkbox.onclick = function() {showHide(number);};
        checkLabel.appendChild(checkbox);

        const copyBtn = document.createElement("input");
        copyBtn.type = "button";
        copyBtn.className = "btn btn-secondary";
        copyBtn.value = "Copy Password";
        copyBtn.onclick = function() {copyPass(number);};
        colBtns.appendChild(copyBtn);
    }
    else
    {
        const spacingPara = document.createElement("p");    // Poor button spacing otherwise
        colBtns.appendChild(spacingPara);

        const createBtn = document.createElement("input");
        createBtn.type = "button";
        createBtn.className = "btn btn-primary";
        createBtn.value = "Create Credentials";
        createBtn.onclick = function() {updateFile(true)};
        colBtns.appendChild(createBtn);
    }
}

function openFile()     // Triggers file selection on sign-in click
{
    fileSelect.click();
}

function getFile()
{
    let content = "";
    const [file] = document.querySelector("input[type=file]").files;    // Better than the deprecated
    const reader = new FileReader();                                    // option.
  
    reader.addEventListener(
      "load",
      () => {
        content = reader.result;        // content contains all of file, no formatting
        signIn(content);
      },
      false,
    );
  
    if (file) { // Was a file selected?
      reader.readAsText(file);
    }
    // No need for else error - user may have cancelled
}

function extractDetails(line)   // Gets the value from an identifier
{
    tArr = line.split(" ");     // Splits on space, right side is to end of line (includes value)
    tArr = tArr[1].split(",");  // Splits on comma, left side is value identifier (make symbols illegal)
    tArr[0] = tArr[0].replace("\"", "");     // Loaded value has an additional pair of quotes
    tArr[0] = tArr[0].replace("\"", "");    // replaceAll is external(?), cannot be used
    tArr[0] = tArr[0].replace("\r", "");    // Last line has \r, if password this must be eliminated.
    return tArr[0];
}

function signIn(content)
{
    const splitLineExp = new RegExp("\n");
    var numLines = 0;
    for (let i = 0; i < content.length; i++)        // Very inefficient
    {
        if (content[i] == '\n')
        {
            numLines++;
        }
    }

    var fileLines = new Array(numLines+1);          // numLines is 1 fewer than total

    fileLines = content.split(splitLineExp);        // Splits into individual lines.

    // Login username is always on line 2 [1]

    let loadUName = "u";
    let loadPWord = "p";

    loadUName = extractDetails(fileLines[1]);
    loadPWord = extractDetails(fileLines[2]);
    

    console.log(loadUName);            // Valid output
    console.log(loadPWord);

    // Textboxes are: SignInUser and SignInPword
    // Almost certainly requires function to wait for DOM load.
    var UName = document.getElementById("SignInUser").value;
    var PWord = document.getElementById("SignInPword").value;


    if (UName == loadUName && PWord == loadPWord)
    {
        /* Sign-In success
        Display message(?) and load other values
        Need to:
            Figure out where EOF is
            Load up to EOF (new function or loop extractDetails?)
        */
       // Format: "siteNo": {"username":"UNAME","password":"PWORD"},

       var splitLines;
       var siteName;
       var siteUName;
       var sitePWord;
       for (let i = 3; i < fileLines.length; i++)   // for all lines, take data.
       {
            if (fileLines[i].search("{") != -1)
            {
                splitLines = fileLines[i].split(":");  // siteNo, username tag, username, etc are now separate
                for (let j = 0; j < splitLines.length; j++)
                {
                    splitLines[j] = splitLines[j].split(",");   // Layout is consistent, provided ':' or ',' are not used
                }

                siteName = splitLines[0][0].slice(2,splitLines[0][0].length-1);
                siteUName = splitLines[2][0].slice(1,splitLines[2][0].length-1);
                if (splitLines[3][0].charAt(splitLines[3][0].length-2) == "}")
                {
                    sitePWord = splitLines[3][0].slice(1,splitLines[3][0].length-3);
                }
                else
                {
                    sitePWord = splitLines[3][0].slice(1,splitLines[3][0].length-2);
                }

                createCredContainer(i, false);  // Creates containers for credentials.

                const heading = document.getElementById("heading"+i);   // Sets values
                heading.textContent = siteName;

                const username = document.getElementById("username"+i);
                username.value = siteUName;

                const password = document.getElementById("password"+i);
                password.value = sitePWord;
            }
       }
       createCredContainer(fileLines.length, true);   // TEMP
    }
    else
    {
        console.error("INVALID CREDENTIALS");
        const errPara = document.getElementById("CredError");
        errPara.removeAttribute("hidden");
        // Ensure that the error message is hidden on successful sign in.
    }
}

function signOut()  // No need to save updates, this should be automatic.
{
    location.reload();
}

function updateFile(newCred)    // newCred is bool, true if triggered by createBtn
{
    // Triggered on any box edited and clicked off of
    // Overwrites passwords.json

    // If newCred, call createCredContainer with empty as true
    // Additionally, save the contents of New Entry, as this would not normally be done
    // May modify the old New Entry box, to prevent confusion.
}

function showHide(numerator)
{
    // Triggered on Show Password checked
    const pWordBox = document.getElementById("password"+numerator);    // Requires modification to work for all passwords

    if (pWordBox.getAttribute("type") == "password")
    {
        pWordBox.setAttribute("type","text");
    }
    else
    {
        pWordBox.setAttribute("type","password");
    }
}

function copyPass(numerator)
{
    // Triggered on Copy Password clicked
    var passVal = document.getElementById("password"+numerator);
    passVal.select();
    navigator.clipboard.writeText(passVal.value);
}