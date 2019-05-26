
var savedUsers = [
    {
        userName: "max",
        password: "1234qwer"
    }
]
function login()
{
    var userName = document.getElementById("userName").value
    var password = document.getElementById("password").value

    for(i = 0; i < savedUsers.length; i++)
    {
        if(userName == savedUsers[i].userName && password == savedUsers[i].password)
        {
            var hide = document.getElementById("loginSection");
            hide = hide.style.display = "none";

            var unhide = document.getElementById("filterSection");
            unhide =unhide.style.display = "block";
        }
        else 
        {
            var message = document.getElementById("message");
            message.innerHTML = "Please enter a valid username and password";
            message = message.style.display = "block";
            
        }
    }
}

function validation()
{
    if (document.getElementById("dogParkCheck").checked || document.getElementById("hikeCheck").checked || document.getElementById("playGroundCheck").checked)
    {
        window.location.replace("http://localhost/unleashed/index.html");
    }
    else
    {
        var message = document.getElementById("messageCheck");
        message.innerHTML = "Please select at least one activity";
        message = message.style.display = "block";
    }
}

function createUser()
{

}

function unhide()
{
    var hide = document.getElementById("createUser");
    hide = hide.style.display = "block";

    var hide = document.getElementById("loginSection");
    hide = hide.style.display = "none";
}

function hide()
{
    var hide = document.getElementById("loginSection");
    hide = hide.style.display = "block";

    var hide = document.getElementById("createUser");
    hide = hide.style.display = "none";
}
