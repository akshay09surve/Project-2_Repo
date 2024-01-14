function printError(elemid,message)
{
    document.getElementById(elemid).style.color = "red"
    document.getElementById(elemid).innerText = message
}

function validation()
{
    let fnm = document.getElementById("fnm").value
    let lnm = document.getElementById("lnm").value
    let uname= document.getElementById("username").value
    let pass = document.getElementById("password").value
    let cnf = document.getElementById("confirm").value
    let id

    let firstnameerror = lastnamerror = emailerror = passworderror = confirmerror = true

    if (fnm == "")
    {
        printError("firstnameerror", "Please enter first name")
    }
    else
    {
        var regex = /^[a-zA-Z\s]+$/
        if(regex.test(fnm) == false)
        {
            printError("firstnameerror","Characters only")
        }
        else
        {
            printError("firstnameerror","")
            firstnameerror = false
        }  
    }

    if (lnm == "")
    {
        printError("lastnamerror", "Please enter last name")
    }
    else
    {
        var regex = /^[a-zA-Z\s]+$/
        if(regex.test(lnm) == false)
        {
            printError("lastnamerror","Characters only")
        }
        else
        {
            printError("lastnamerror","")
            lastnamerror = false
        }  
    }

    if (uname == "")
    {
        printError("emailerror", "Please enter email ID")
    }
    else
    {
        printError("emailerror", "")
        emailerror = false
    }

    if (pass == "")
    {
        printError("passworderror", "Please enter password")
    }
    else
    {
        printError("passworderror", "")
        passworderror = false
    }

    if (cnf == "")
    {
        printError("confirmerror", "Please re-enter password")
    }
    else
    {
        if(pass != cnf)
        {
            printError("confirmerror", "Passwords do not match")
        }
        else
        {
            printError("confirmerror", "")
            confirmerror = false
        }
    }
    
    if((firstnameerror || lastnamerror || emailerror || passworderror || confirmerror) == true)
    {
        return false
    }
    else
    {

        fetch("http://localhost:4500/users", { method: "POST", body: JSON.stringify({ "id": id, "firstname": fnm, "lastname": lnm, "username": uname, "password": pass }), headers: { 'Content-type': 'application/json; charset=UTF-8' } })
            .then((response) => { response.json() }).then((data) => {
                let userdata = data
                alert("User registration successful for user "+fnm+" "+lnm)
            })
        goTo()
    }
}

function goTo()
{
    window.location.href = "http://127.0.0.1:5500/Login.html"
}