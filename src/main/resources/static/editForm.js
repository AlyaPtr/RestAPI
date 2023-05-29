document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("edit_button").addEventListener("click", async () => {

        let data = {
            id: document.getElementById("edit_id").value,
            firstname: document.getElementById("edit_firstname").value,
            lastname: document.getElementById("edit_lastname").value,
            age: document.getElementById("edit_age").value,
            email: document.getElementById("edit_username").value,
            password: document.getElementById("edit_password").value,
            roles: [
                {name: document.getElementById("edit_roles_select").value}
            ]
        }

        if(document.getElementById("edit_roles_select").value !== "ROLE_USER" && document.getElementById("edit_roles_select").value !== '') {
            data["roles"].push({name : "ROLE_USER"});
        }

        await fetch('http://localhost:8080/rest/admin/edit/' + document.getElementById("edit_id").value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            let row_id = "user_" + document.getElementById("edit_id").value;
            let row = document.getElementById(row_id);
            row.querySelector(".column.firstname").innerText = document.getElementById("edit_firstname").value;
            row.querySelector(".column.lastname").innerText = document.getElementById("edit_lastname").value;
            row.querySelector(".column.age").innerText = document.getElementById("edit_age").value;
            row.querySelector(".column.username").innerText = document.getElementById("edit_username").value;
            let span = document.createElement("span");
            if (document.getElementById("edit_roles_select").value !== '') {
                span.innerText = String(document.getElementById("edit_roles_select").value).replace(/ROLE_/, '') + ' ';
                while (row.querySelector(".column.role").firstChild) {
                    row.querySelector(".column.role").removeChild(row.querySelector(".column.role").firstChild);
                }
                row.querySelector(".column.role").appendChild(span);
                if (span.innerText !== 'USER' && row.querySelector(".column.role").childNodes.length === 1) {
                    console.log("ye");
                    let span1 = document.createElement("span");
                    span1.innerText = "USER ";
                    row.querySelector(".column.role").appendChild(span1);
                }
            }
            document.getElementById(row_id).replaceWith(row);
        })
    })
});
