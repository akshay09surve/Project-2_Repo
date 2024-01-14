// This is method 2 of using the fetch API 
const api_url = "http://localhost:4500/Roommates/"

async function getAllUsers(url)
{
    let jsondata = await fetch(url)
    let data = await jsondata.json()

    showAll(data)
}

function showAll(data)
{

    let x = `<tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Branch</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>`
    data.forEach(rm => {

        x +=`<tr>
                    <td>${rm.name}</td>
                    <td>${rm.city}</td>
                    <td>${rm.branch}</td>
                    <td>${rm.contact}</td>
                    <td><a href="./ItemDetails.html?id=${rm.id}" style="text-decoration:none;">Details</a></td>
                    <td><a id="update" href="./EditItem.html?id=${rm.id}" style="text-decoration:none;" onclick="eidtUser()">Edit</a></td>
                </tr>`
    });
    
    document.getElementById("matesTable").innerHTML = x
}

    function getDetails()
    {
        const urlParams = new URLSearchParams(location.href)
        for (const [key, value] of urlParams)
        {
            var uid = value
        }
        var idvalue = uid

        async function display()
        {
            let jsondata = await fetch(api_url)
            let data = await jsondata.json()

            data.forEach(user => {
                if (idvalue == user.id)
                {
                    let x = `<h4>Details are as follows : </h4>
                            <p>Id - ${user.id}</p>
                            <p>Name - ${user.name}</p>
                            <p>City - ${user.city}</p>
                            <p>Branch - ${user.branch}</p>
                            <p>Contact - ${user.contact}</p>`
                    document.getElementById("info").innerHTML = x
                }
            })
        }
        display()
}
    
function EditDetails()
{
        const urlParams = new URLSearchParams(location.href)
        for (const [key, value] of urlParams)
        {
            var uid = value
        }
        var idvalue = uid

        async function display()
        {
            let jsondata = await fetch(api_url)
            let data = await jsondata.json()

            data.forEach(user => {
                if (idvalue == user.id)
                {
                    document.getElementById("editName").value = user.name
                    document.getElementById("editCity").value = user.city
                    document.getElementById("editBranch").value = user.branch
                    document.getElementById("editContact").value = user.contact
                }
            })
        }
    display()
}

function saveEdit()
{
    let newName = document.getElementById("editName").value
    let newCity = document.getElementById("editCity").value
    let newBranch = document.getElementById("editBranch").value
    let newContact = document.getElementById("editContact").value

    const urlParams = new URLSearchParams(location.href)
    for (const [key, value] of urlParams)
    {
        var uid = value
    }
    var idvalue = uid

    fetch(api_url + idvalue, { method: "PUT", body: JSON.stringify({ "name": newName, "city": newCity, "branch": newBranch, "contact": newContact }), headers: { 'Content-type': 'application/json; charset=UTF-8' } })
        .then((response) => response.json()).then((result) =>
        {
            console.log(result)
            alert(" -- User records have been updated for ID :"+idvalue+" -- ")
        })
        document.getElementById("editItem").style.color = "green" 
        document.getElementById("editItem").innerHTML = "-- User records have been updated --"
}

async function searchUsingCity(url)
{
    let jsondata = await fetch(url)
    let data = await jsondata.json()

    showUserByCity(data)
}
function showUserByCity(data)
{
    let x = `<tr>
                <th>Name</th>
                <th>City</th>
                <th>Branch</th>
                <th>Contact</th>
                <th>Action</th>
            </tr>`
    
    let city = document.getElementById("city").value

    data.forEach(user => {
        if (city == user.city)
        {
            x +=`<tr>
                    <td>${user.name}</td>
                    <td>${user.city}</td>
                    <td>${user.branch}</td>
                    <td>${user.contact}</td>
                </tr>`
        }
    })
    document.getElementById("matesTable").innerHTML = x
}

async function searchUsingName(url)
{
    let jsondata = await fetch(url)
    let data = await jsondata.json()

    showUserByName(data)
}

function showUserByName(data)
{
    let x = `<tr>
                <th>Name</th>
                <th>City</th>
                <th>Branch</th>
                <th>Contact</th>
            </tr>`
    
    let userName = document.getElementById("name").value
    
    data.forEach(rm => {
        if (userName == rm.name)
        {
            x +=`<tr>
                    <td>${rm.name}</td>
                    <td>${rm.city}</td>
                    <td>${rm.branch}</td>
                    <td>${rm.contact}</td>
                </tr>`
        }
    });

    document.getElementById("matesTable").innerHTML = x
}

function createUser()
{
    let name1 = document.getElementById("name").value
    let city1 = document.getElementById("city").value
    let branch1 = document.getElementById("branch").value
    let contact1 = parseInt(document.getElementById("contact").value)

    let newUser = {"name":name1,"city":city1,"branch":branch1,"contact":contact1}
    
    fetch('http://localhost:4500/Roommates/',
        {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {'Content-type':'application/json; charset=UTF-8'}
        }
    ).then((response) => response.json()).then((result) =>
        {
            console.log(result)
        }
    )
    .catch(function(err){console.log(err);})
}

function deleteUser()
{
    let idval = prompt("Enter id to delete")

    let confirm = document.getElementById("confirm")
    let x = `<h4 style="color:red;">Do you really want to delete ?</h4>
            <button id="confirmButton">Yes</button>
            <button><a href="./NewUser.html">No</a></button>`
    
    confirm.innerHTML = x

    let confrimButton = document.getElementById("confirmButton")
    confrimButton.addEventListener("click",function yes()
    {
        fetch("http://localhost:4500/Roommates/" + idval, { method: "DELETE", headers: { 'Content-type': 'application/json; charset=UTF-8' } }).then((response) => { response.json() }).then((data) => {alert("Data has been deleted for ID - "+idval)}).catch(function error(err){console.log(err)})
    })
}
