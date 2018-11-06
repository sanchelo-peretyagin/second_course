
var param = new Array();
let k=0;
var tmp = new Array();
var tmp2 = new Array();
var get = location.search;
if(get != '')
{
    tmp = (get.substr(1)).split('&');
    for(var i=0; i < tmp.length; i++)
    {
        tmp2 = tmp[i].split('=');
        param[tmp2[0]] = tmp2[1];
    }
    for (var key in param)
    {
      console.log(key+' = '+param[key]);
    }
};

var name=param['name'];
var price = parseInt(param['price']);
var quantity = parseInt(param['quantity']);
$('#name').val(name);
$('#price').val(price);
$('#quantity').val(quantity);

$('#buy').on('click',function(){
  let val=$('#quantity').attr('value');
  if(val > 0 && val <= quantity)
  {
    k=parseInt(val);
    quantity-=val;
    location.href = 'buy.html?name=' + name + "&price=" + price + "&quantity=" + quantity;
  }
  else
  {
      alert('incorrect price');
    return;
  }
  if(quantity==0)
  {
      $('#quantity').prop('disabled', true);
  }


  if($('#y').prop('checked')==true){
    localStorage.setItem('bought', val);
    localStorage.setItem('price', price);
    //$('a').attr('href','chek.html?name='+name+'&price='+price+'&quantity='+val);
  }
  else $('a').attr('href','#');
  $('#quantity').val(quantity);
  localStorage.setItem('quantity', quantity);
  localStorage.setItem('name', name);
})
