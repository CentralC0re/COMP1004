// Listeners go up here
window.addEventListener("DOMContentLoaded", (event) => {	// Waits for DOM load
    const fileSelect = document.getElementById("fileSelect");
    fileSelect.addEventListener("change",getFile);
});

function createCredContainer(number)    // Number is used to numerate Id's
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
    accordBtn.textContent = "PLACEHOLDER"                  // This must be set to the entry name
    accordHead.appendChild(accordBtn);                     // Possibly in the calling function

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

    const checkLabel = document.createElement("label");
    checkLabel.innerText = "Show Password ";
    colBtns.appendChild(checkLabel);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "";
    checkbox.id = "showWord" + number;
    checkLabel.appendChild(checkbox);

    const copyBtn = document.createElement("input");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-secondary";
    copyBtn.value = "Copy Password";
    colBtns.appendChild(copyBtn);
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

                siteName = splitLines[0];
                // Get left side of splitLines[2] for siteUName 
                siteUName = splitLines[2];
                // Get left side of splitLines[2] for sitePWord
                sitePWord = splitLines[4];
                console.log(siteName);
                console.log(siteUName);
                console.log(sitePWord);

                createCredContainer(i);  // Creates containers for credentials.

                const heading = document.getElementById("heading"+i);   // Sets values
                heading.textContent = siteName;

                const username = document.getElementById("username"+i);
                username.value = siteUName;

                const password = document.getElementById("password"+i);
                password.value = sitePWord;
            }
       }
    }
    else
    {
        console.error("INVALID CREDENTIALS");
        const errPara = document.getElementById("CredError");
        errPara.removeAttribute("hidden");
        // Ensure that the error message is hidden on successful sign in.
    }
}

function signOut()
{
    // SAVE VALUES AND CLOSE FILE HERE

    location.reload();
}

function updateUser()
{
    // Triggered on Username Box edited and clicked off of
    // Overwrites value of Username for the entry, then saves
}

function updatePass()
{
    // Triggered on Password Box edited and clicked off of
    // Overwrites value of Password for the entry, then saves
}

function showHide()
{
    // Triggered on Show Password checked
    const pWordBox = document.getElementById("password");    // Requires modification to work for all passwords

    if (pWordBox.getAttribute("type") == "password")
    {
        pWordBox.setAttribute("type","text");
    }
    else
    {
        pWordBox.setAttribute("type","password");
    }
}

function copyPass()
{
    // Triggered on Copy Password clicked
    var pWordBox = document.getElementById("password");    // Adjust to be universal
    pWordBox.select();
    pWordBox.setSelectionRange(0,99999);    // May not be necessary
    navigator.clipboard.writeText(pwordBox.value);
}