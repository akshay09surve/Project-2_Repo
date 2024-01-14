function printError(elemid, message)
{
    document.getElementById(elemid).style.color = "red"
    document.getElementById(elemid).innerText = message
}

function login()
{
    let uname = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let usernameerror = passworderror = true

    if (uname == "")
    {
        printError("usernameerror","Please enter email id")    
    }
    else
    {
        printError("usernameerror", "")
        usernameerror = false
    }

    if (pass == "")
    {
        printError("passworderror","Please enter password")
    }
    else
    {
        printError("passworderror", "")
        passworderror = false
    }

    if ((usernameerror || passworderror) == true)
    {
        return false
    }
    else
    {
        fetch("http://localhost:4500/users/", { method: "GET", headers: { 'Content-type': 'application/json; charset=UTF-8' } })
        .then((response) =>response.json())
        .then((data) => {
            var alldata = data

            alldata.forEach(user => {
                if((uname == user.username) && (pass == user.password))
                {
                    goTo()
                }
                else
                {
                    document.getElementById("passworderror").style.color = "red"
                    document.getElementById("passworderror").innerText = "Not a registered user. Get registered first."
                }
            });
        })
    }
}

function goTo()
{
    window.location.href = "http://127.0.0.1:5500/Roommates.html"
}