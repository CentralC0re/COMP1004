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

    const uNameExpress = new RegExp("\"Username\":")
    // Login username is always on line 2 [1]

    let loadUName = "";
    let loadPWord = "password";

    {   // Make this a function?
        var temp = fileLines[1];
        var tArr = temp.split(" ");     // Splits on space, right side is to end of line (includes username)
        tArr = tArr[1].split(",");      // Splits on comma, left side is username (make symbols illegal)
        loadUName = tArr[0];
    }

    console.log(loadUName);            // Valid output

    // Textboxes are: SignInUser and SignInPword
    // Almost certainly requires function to wait for DOM load.
    var UName = document.getElementById("SignInUser").nodeValue;    // These are null.
    var PWord = document.getElementById("SignInPword").nodeValue;   // Input is probably bad, figure it out.


    if (UName == loadUName && PWord == loadPWord)
    {
        // Sign-In success
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