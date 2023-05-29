
$(async function() {
    await addUser();
});

async function addUser() {
    document.getElementById("add_button").addEventListener("click", (e) => {
        e.preventDefault();
        let data = {
            firstname: document.getElementById("add_firstname").value,
            lastname: document.getElementById("add_lastname").value,
            age: document.getElementById("add_age").value,
            email: document.getElementById("add_email").value,
            password: document.getElementById("add_password").value,
            roles: [
                { name: document.getElementById("add_role").value }
            ]
        };

        if (document.getElementById("add_role").value !== "ROLE_USER" && document.getElementById("add_role").value !== "") {
            data["roles"].push({name : "ROLE_USER"});
        }
        fetch('http://localhost:8080/rest/admin/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let promise = await fetch('http://localhost:8080/rest/admin');
            if (promise.ok) {
                let json = await promise.json();
                let id = json[json.length - 1].id;
                await addRow(id,
                    data["firstname"],
                    data["lastname"],
                    data["age"],
                    data["email"],
                    data["roles"]);
            }
        })
    });
}
