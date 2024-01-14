// Listeners go up here

function signIn()
{
    // Takes values from Username and Password textboxes, checks against hashed values.

    // Textboxes are: SignInUser and SignInPword
    // Almost certainly requires function to wait for DOM load.
    var UName = document.getElementById("SignInUser");
    var PWord = document.getElementById("SignInPword");
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