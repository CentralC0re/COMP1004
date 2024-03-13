// Listeners go up here
window.addEventListener("DOMContentLoaded", (event) => {	// Waits for DOM load
    const fileSelect = document.getElementById("fileSelect");
    fileSelect.addEventListener("change",getFile);
});

function createCredContainer(number)    // Number is used to numerate Id's
{
    // CREATES HTML FOR CREDENTIALS
    // May need to make this using single line creations, but this will make the function VERY long.
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

                createCredContainer();  // Creates containers for credentials.
                
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