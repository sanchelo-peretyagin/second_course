let name=localStorage.getItem('name');
let price=localStorage.getItem('price');
let quantity=localStorage.getItem('bought');
$('#name').text(name);
$('#price').text(price);
$('#num').text(quantity);
$('#allprice').text(price*quantity);
