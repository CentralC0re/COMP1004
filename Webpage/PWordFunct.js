// Listeners go up here
window.addEventListener("DOMContentLoaded", (event) => {	// Waits for DOM load
    const fileSelect = document.getElementById("fileSelect");
    fileSelect.addEventListener("change",signIn);
});

function openFile()     // Triggers file selection on sign-in click
{
    fileSelect.click();
}

function signIn()
{
    console.log('signIn Called');

    files = event.target.files;     // event is deprecated, not sure how else to do this
    const reader = new FileReader();
    // Continue from https://web.dev/articles/read-files

    // Textboxes are: SignInUser and SignInPword
    // Almost certainly requires function to wait for DOM load.
    var UName = document.getElementById("SignInUser");
    var PWord = document.getElementById("SignInPword");

    /*var file;             // JSON does not work unless hosted, CORS blocks file access
    fetch("./passwords.json")
        .then(res => {
            if (!res.ok) {
                    throw new Error('HTTP error! Status: $(res.status)');   // This should never run, given it's clientside
            }
            file = res.json();
        })
        .then((data) =>
            console.log(data))
        .catch((error) =>
            console.error("Unable to retrieve passwords"));

    console.log(file);  // TEMP
    */

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