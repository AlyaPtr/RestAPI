
let list = document.getElementById("userList");

$(async function() {
    let promise = await fetch('http://localhost:8080/rest/admin');
    if (promise.ok) {
        let json = await promise.json();


        for(let i = 0; i < json.length; i++) {
            console.log("LEN " + json[i].roles.length);
            await addRow(json[i].id, json[i].firstname, json[i].lastname, json[i].age, json[i].username, json[i].roles)
        }

    } else {
        alert("Ошибка HTTP: " + promise.status);
    }

});


// Добавление строки в таблицу
async function addRow(_id, _fn, _ln, _age, _email, _roles) {

    let li = document.createElement("li");
    li.className = "list-group-item";
    li.setAttribute("id", "user_" + _id);

    let row = document.createElement("div");
    row.className = "row";

    let id = document.createElement("div");
    id.classList.add("column");
    id.classList.add("id");
    id.innerText = _id;
    id.style.cssText = "width: 5vw;";
    row.appendChild(id);

    let firstname = document.createElement("div");
    firstname.classList.add("column");
    firstname.classList.add("firstname");
    firstname.innerText = _fn;
    firstname.style.cssText = "width: 13vw;";
    row.appendChild(firstname);

    let lastname = document.createElement("div");
    lastname.classList.add("column");
    lastname.classList.add("lastname");
    lastname.innerText = _ln;
    lastname.style.cssText = "width: 13vw;";
    row.appendChild(lastname);

    let age = document.createElement("div");
    age.classList.add("column");
    age.classList.add("age");
    age.innerText = _age;
    age.style.cssText = "width: 7vw;";
    row.appendChild(age);

    let username = document.createElement("div");
    username.classList.add("column");
    username.classList.add("username");
    username.innerText = _email;
    username.style.cssText = "width: 13vw;";
    row.appendChild(username);

    let role = document.createElement("div");
    role.classList.add("column");
    role.classList.add("role");
    role.style.cssText = "width: 13vw;";
    let roles = _roles;
    for (let j = 0; j < roles.length; j++) {
        //alert("ROLE " + roles[j].name);
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
        document.getElementById("edit_id").value = _id;
        document.getElementById("edit_firstname").value = _fn;
        document.getElementById("edit_lastname").value = _ln;
        document.getElementById("edit_age").value = _age;
        document.getElementById("edit_username").value = _email;
        modal.show();
    }


    let buttonDelete = document.createElement("div");
    buttonDelete.className = "column";
    buttonDelete.style.cssText = "width: 6vw;";
    let a1 = document.createElement("button");
    a1.className = "btn btn-danger";
    a1.innerText = "Delete";
    buttonDelete.appendChild(a1);
    row.appendChild(buttonDelete);

    let modal1 = new bootstrap.Modal(document.getElementById("deleteModal"), {});
    a1.onclick = function() {
        document.getElementById("delete_id").value = _id;
        document.getElementById("delete_firstname").value = _fn;
        document.getElementById("delete_lastname").value = _ln;
        document.getElementById("delete_age").value = _age;
        document.getElementById("delete_email").value = _email;
        modal1.show();
    }

    li.appendChild(row);

    list.appendChild(li);
}

