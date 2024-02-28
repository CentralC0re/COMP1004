// Listeners go up here
window.addEventListener("DOMContentLoaded", (event) => {	// Waits for DOM load
    const fileSelect = document.getElementById("fileSelect");
    fileSelect.addEventListener("change",getFile);
});

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
                siteName = splitLines[0];           // Layout is consistent, provided there are no ":"'s
                siteUName = splitLines[2];
                sitePWord = splitLines[4];
                console.log(siteName);
                console.log(siteUName);
                console.log(sitePWord);

                // COPY AND SET TEMPLATE HERE
            }
       }
    }
    else
    {
        console.error("INVALID CREDENTIALS")    // Make this a paragraph
    }
}

function signOut()
{
    // Saves all values and closes file
}

function load()
{
    // Loads values, uses template and fills it with the relevant values.
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
    // Triggered on Show Password checked, sets Password Box to general text and back again
}

function copyPass()
{
    // Triggered on Copy Password clicked, stores value of Password Box into clipboard
}