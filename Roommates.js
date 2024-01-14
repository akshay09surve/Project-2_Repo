
// This is method 1 of using the fetch API

fetch("http://localhost:4500/roommates")
    //To handle the response
    .then(Response => Response.json())
    //To handle the data recieved from responce
    .then(res => 
    {
        let data = `<tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Branch</th>
                        <th>Contact</th>
                    </tr>`
        res.forEach(rm => {
            data +=`<tr>
                        <td>${rm.name}</td>
                        <td>${rm.city}</td>
                        <td>${rm.branch}</td>
                        <td>${rm.contact}</td>
                    </tr>` 
        });
        document.getElementById("matesTable").innerHTML = data
    })