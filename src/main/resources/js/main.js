let promise = await fetch('http://localhost:8080/admin');
if (promise.ok) {
    let json = promise.json();
    alert("ok");
} else {
    alert("Ошибка HTTP: " + promise.status);
}
