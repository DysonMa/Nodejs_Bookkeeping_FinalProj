const studentsTable = document.querySelector('#acc-table');
const form = document.querySelector("#add-accounts-form");
// create element & render 
function renderStudents(doc){
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', doc.id);
    td1.textContent = doc.data().item;
    td2.textContent = doc.data().account;
    td3.textContent = doc.data().date;
    td4.textContent = doc.data().location;
    td5.textContent = doc.data().price;
    td6.textContent = doc.data().category;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    
    // delete 
    let cross = document.createElement('td');
    cross.id = "cross-family";
    cross.textContent = 'X';
    tr.appendChild(cross);
    cross.addEventListener('click', (test) => {
        test.stopPropagation();
        // 往上找parentElement
        let id = test.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('Account').doc(id).delete().then(()=>{
            alert("Successfully Delete Account !");
            location.reload()
        });
        // 自己重新整理
        // await location.reload();
    });
    //

    studentsTable.appendChild(tr);
}

// getting data 
db.collection('Account').get().then(data => {
    data.docs.forEach(doc => {
        console.log(doc.data());
        renderStudents(doc);
    });
});

// add data
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await db.collection('Account').add({
        item: form.item.value,
        date: form.date.value,
        location: form.location.value,
        price: form.price.value,
        account: form.account.value,
        category: form.category.value
    });
    // form.item.value = '';
    // form.date.value = '';
    // form.price.value = '';
    alert("Successfully Add Account !");
    location.reload();  // 自己重新整理

});