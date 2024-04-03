// TODO: Restructure functions
//       Add a readme file

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
        name.id = "nameLbl" + number;
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
    colBtns.id = "btnCol" + number;
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
        createBtn.id = "create" + number;
        createBtn.className = "btn btn-primary";
        createBtn.value = "Create Credentials";
        createBtn.onclick = function() {newCred(number)};
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

    // Textboxes are: SignInUser and SignInPword
    // Almost certainly requires function to wait for DOM load.
    var UName = document.getElementById("SignInUser").value;
    var PWord = document.getElementById("SignInPword").value;
    
    var hashBuffer = str2ab(UName);
    // This is an array buffer. The function is from the chrome developer website,
    // go to the function for the link.
    // Digest produces a hashed value, in this case with the SHA-256 function.
    var UNamePromise = crypto.subtle.digest('SHA-256', hashBuffer)
    UNamePromise.then((values) =>   // This was originally handled with a function as it is repeated.
    {                               // The function was not asynchronous, causing issues.
        UName = "";
        var uintArr = new Uint8Array(values);
        for (var i = 0; i < uintArr.length; i++)
        {
            UName += uintArr[i];
        }
    

        hashBuffer = str2ab(PWord);
        var PWordPromise = crypto.subtle.digest('SHA-256', hashBuffer)
        PWordPromise.then((values) =>
        {
            PWord = "";
            var uintArr = new Uint8Array(values);
            for (var i = 0; i < uintArr.length; i++)
            {
                PWord += uintArr[i];
            }
        

            if (UName == loadUName && PWord == loadPWord)
            {
                // Format: "siteName": {"username":"UNAME","password":"PWORD"},

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

                        createCredContainer(i-2, false);  // Creates containers for credentials.

                        const heading = document.getElementById("heading"+(i-2));   // Sets values
                        heading.textContent = siteName;

                        const username = document.getElementById("username"+(i-2));
                        username.value = siteUName;

                        const password = document.getElementById("password"+(i-2));
                        password.value = sitePWord;
                    }
                }
                createCredContainer(fileLines.length-3, true);
                document.getElementById("saveBtn").removeAttribute("hidden");
            }
            else
            {   // On sign-in error, the user must reload the page, cause unknown (scope and event listeners?)
                console.error("INVALID CREDENTIALS");
                document.getElementById("CredError").removeAttribute("hidden");
            }
        });
    });
}

function signOut()
{
    updateFile();
    location.reload();
}

function newCred(number)
{
    const titleLbl = document.getElementById("nameLbl" + number);
    titleLbl.remove();
    const title = document.getElementById("name" + number);
    document.getElementById("heading" + number).textContent = title.value;
    title.remove();

    const createBtn = document.getElementById("create" + number);
    createBtn.remove();

    const colBtns = document.getElementById("btnCol" + number);

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

    createCredContainer(number+1, true);
}

function updateFile()
{
    // Triggered when Update File button pressed. 
    let fileContents = "{\n";

    fileContents += "\t\"username\": \"";
    var hashBuffer = str2ab(document.getElementById("SignInUser").value);
    var UNamePromise = crypto.subtle.digest('SHA-256', hashBuffer)
    var UNameOut;
    UNamePromise.then((values) =>
    {
        UNameOut = "";
        var uintArr = new Uint8Array(values);
        for (var i = 0; i < uintArr.length; i++)
        {
            UNameOut += uintArr[i];
        }
    
        fileContents += UNameOut + "\",\n";
        
        fileContents += "\t\"password\": \"";
        hashBuffer = str2ab(document.getElementById("SignInPword").value);
        var PWordPromise = crypto.subtle.digest('SHA-256', hashBuffer)
        var PWordOut;
        PWordPromise.then((values) =>
        {
            PWordOut = "";
            var uintArr = new Uint8Array(values);
            for (var i = 0; i < uintArr.length; i++)
            {
                PWordOut += uintArr[i];
            }
        
            fileContents += PWordOut + "\",\n";

            var numerator = 1;  // Find number of entries
            while (document.getElementById("heading"+numerator) != null)
            {
                numerator++;
            }

            for (var i = 1; i < numerator-1; i++)   // Store entries
            {
                fileContents += "\t\"" + document.getElementById("heading" + i).innerText + "\":{";
                fileContents += "\"username\":\"" + document.getElementById("username" + i).value + "\",";
                fileContents += "\"password\":\"" + document.getElementById("password" + i).value + "\"}";
                if (i != numerator - 2)
                {
                    fileContents += ",\n";
                }
            }
            fileContents += "\n}";

            var file = new File(["\ufeff"+fileContents], "passwords.json", {type:"application/json"});

            var fileReference = window.URL.createObjectURL(file);

            var downloadLink = document.createElement("a");
            downloadLink.hidden = true;
            downloadLink.href = fileReference;
            downloadLink.download = file.name;
            downloadLink.click();
            
            window.URL.revokeObjectURL(fileReference);
        });
    });
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

// NOTE: This function is taken from https://developer.chrome.com/blog/how-to-convert-arraybuffer-to-and-from-string
// as no libraries seem to exist which I can use to convert from string to array buffer, and array
// buffer is too complex for me to use.
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
    }
    return buf;
}