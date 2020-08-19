const cross = document.querySelectorAll('#cross-family')
const form = document.querySelector("#add-accounts-form");

// 不確定port是否會在8888
// let port = process.env.PORT || 8888

// delete
for(let i = 0 ; i < cross.length; i ++){
    cross[i].addEventListener('click', async (test) => {
        // test.stopPropagation();
        let id = cross[i].getAttribute('cross-id');
        console.log(id);

        // call delete api
        let apiUrl = `https://nodejs-dysonma-finalproj.herokuapp.com/BookKeeping_backend/API/deleteAccount?id=${id}`
        let res = await fetch(apiUrl, {method:'GET'});
        let text = await res.text();
        console.log(text);
        console.log("in the cross, id = ", id);

        await alert("Successfully Delete Account !");
        // 馬上重新整理
        await location.reload();
    });
}

// add data
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // call add api
    item    = form.item.value,
    acc = form.account.value,
    date  = form.date.value,
    loc     = form.location.value
    price = form.price.value,
    category = form.category.value

    let apiUrl = `https://nodejs-dysonma-finalproj.herokuapp.com/BookKeeping_backend/API/addAccount?item=${item}&account=${acc}&date=${date}&location=${loc}&price=${price}&category=${category}`
    let res = await fetch(apiUrl, {method:'GET'});
    let text = await res.text();
    console.log(text);
    // form.name.value = '';
    // form.gender.value = '';
    // form.age.value = '';
    await alert("Successfully Add Account !");
    await location.reload();
});