
let list = document.getElementById("userList");
document.addEventListener("DOMContentLoaded", async () => {
    let promise = await fetch('http://localhost:8080/admin');
    let current = await fetch('http://localhost:8080/user');
    if (promise.ok) {
        let json = await promise.json();
        console.log(JSON.stringify(json));

        let cur = await current.json();


        for(let i = 0; i < json.length; i++) {

            let li = document.createElement("li");
            li.className = "list-group-item";

            let row = document.createElement("div");
            row.className = "row";


            let id = document.createElement("div");
            id.className = "column";
            id.innerText = json[i].id;
            id.style.cssText = "width: 5vw;";
            row.appendChild(id);

            let firstname = document.createElement("div");
            firstname.className = "column";
            firstname.innerText = json[i].firstname;
            firstname.style.cssText = "width: 13vw;";
            row.appendChild(firstname);

            let lastname = document.createElement("div");
            lastname.className = "column";
            lastname.innerText = json[i].lastname;
            lastname.style.cssText = "width: 13vw;";
            row.appendChild(lastname);

            let age = document.createElement("div");
            age.className = "column";
            age.innerText = json[i].age;
            age.style.cssText = "width: 7vw;";
            row.appendChild(age);

            let username = document.createElement("div");
            username.className = "column";
            username.innerText = json[i].username;
            username.style.cssText = "width: 13vw;";
            row.appendChild(username);

            let role = document.createElement("div");
            role.className = "column";
            role.style.cssText = "width: 13vw;";
            let roles = json[i].roles;
            for (let j = 0; j < roles.length; j++) {
                let span = document.createElement("span");
                span.innerText = String(roles[j].name).replace(/ROLE_/, '') + ' ';
                role.appendChild(span);
            }
            row.appendChild(role);

            let buttonEdit = document.createElement("div");
            buttonEdit.className = "column";
            buttonEdit.style.cssText = "width: 6vw;";
            let a = document.createElement("button");
            a.className = "btn btn-info";
            a.innerText = "Edit";
            buttonEdit.appendChild(a);
            row.appendChild(buttonEdit);

            // Edit modal
            let modal = new bootstrap.Modal(document.getElementById('editModal'), {});
            a.onclick = function() {
                document.getElementById("edit_id").value = json[i].id;
                document.getElementById("edit_firstname").placeholder = json[i].firstname;
                document.getElementById("edit_lastname").placeholder = json[i].lastname;
                document.getElementById("edit_age").placeholder = json[i].age;
                document.getElementById("edit_username").placeholder = json[i].username;
                modal.show();
            }
            let EditWrapperDiv = document.getElementById("editModelBody");


            let buttonDelete = document.createElement("div");
            buttonDelete.className = "column";
            buttonDelete.style.cssText = "width: 6vw;";
            a = document.createElement("button");
            a.className = "btn btn-danger";
            a.innerText = "Delete";
            a.id = "openEditModal"
            buttonDelete.appendChild(a);
            row.appendChild(buttonDelete);

            li.appendChild(row);

            list.appendChild(li);
        }

    } else {
        alert("Ошибка HTTP: " + promise.status);
    }
});

