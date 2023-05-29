document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("delete_button").addEventListener("click", async () => {
        await fetch('http://localhost:8080/rest/admin/delete/' + document.getElementById("delete_id").value, {
            method: 'DELETE',
        })
    });
});