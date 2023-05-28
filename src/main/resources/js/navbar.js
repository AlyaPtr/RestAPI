document.addEventListener("DOMContentLoaded", async () => {
    let current = await fetch('http://localhost:8080/user');
    if (current.ok) {
        let json = await current.json();
        let nav = document.getElementById("navbarNav");

        let div = document.createElement("div");
        div.className = "col-11";
        div.style.cssText = "font-size: 14pt";

        let b = document.createElement("b");
        b.innerText = json.username;
        div.appendChild(b);

        let span = document.createElement("span");
        span.innerText = " with roles ";
        div.appendChild(span);

        for (let i = 0; i < json.roles.length; i++) {
            let roleSpan = document.createElement("span");
            roleSpan.innerText = json.roles[i].name;
            div.appendChild(roleSpan);
        }
        nav.appendChild(div);
    }
});