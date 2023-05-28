document.addEventListener("DOMContentLoaded", async () => {
    let json = await fetch('http://localhost:8080/admin');
    if(json.ok) {

        let select = document.getElementById("edit_roles_select");
        let option1 = document.createElement("option");
        option1.innerText = "USER";
        select.appendChild(option1);
        let option2 = document.createElement("option");
        option2.innerText = "ADMIN";
        select.appendChild(option2);
        let option3 = document.createElement("option");
        option3.innerText = "MODERATOR";
        select.appendChild(option3);


        document.getElementById("edit_button").addEventListener("click", async () => {
            const data = {
                id: document.getElementById("edit_id").value,
                firstname: document.getElementById("edit_firstname").value,
                lastname: document.getElementById("edit_lastname").value,
                age: document.getElementById("edit_age").value,
                email: document.getElementById("edit_username").value,
                password: document.getElementById("edit_password").value,
                roles: [
                    { name: 'ROLE_' + document.getElementById("edit_roles_select").value }
                ]
            }

            //let w = document.getElementById("edit_roles_select").value;
            console.log(JSON.stringify(data));
            let flag = false;
            await fetch("http://localhost:8080/admin/edit/" + document.getElementById("edit_id").value, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
        })
    }
});
