document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("delete_button").addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/rest/admin/delete/' + document.getElementById("delete_id").value, {
            method: 'DELETE',
        }).then(() => {
            let el = document.getElementById("user_" + document.getElementById("delete_id").value);
            el.remove();
        })
    });
});