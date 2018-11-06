
tableData = [
    { Id: 123, Name: 'Sumsung', Price: 200, Quantity: 8 },
    { Id: 121, Name: 'HTC', Price: 235, Quantity: 7 },
    { Id: 122, Name: 'BlackBerry', Price: 123, Quantity: 7 },
    { Id: 128, Name: 'Nokia', Price: 12, Quantity: 10 }
];
let tmp;
if(localStorage.getItem('quantity')){
  let namechange=localStorage.getItem('name');
  let quantitychange=localStorage.getItem('quantity');
  for(let i=0;i<tableData.length;i++)
  {
    if(tableData[i]['Name']==namechange)
    {
      tmp=tableData[i]['Id'];
      tableData[i]['Quantity']=quantitychange;
    }
  };
};


let viewStatus = 0;
let shownColumns;
let a=$('a');

let showNamePrice = $('#showNamePrice');
let showNamePriceQuantity = $('#showNamePriceQuantity');
let showAll = $('#showAll');
let backup = $('#backup');
let addToTable = $('#addToTable');
let actionsButtons = $('#actionsButtons');
actionsButtons.css('display','none');
let $form = $("#promptForm");
let $container = $("#formContainer");
let $formCancel = $("[name='cancel']");

/*СОРТИРОВКА*/
function compareNumeric(a, b) {
    return a - b;
}
function compareStrings(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
}
function compareDataId(a, b) { return compareNumeric(a.Id, b.Id); }
function compareDataName(a, b) { return compareStrings(a.Name, b.Name); }
function compareDataPrice(a, b) { return compareNumeric(a.Price, b.Price); }
function compareDataQuantity(a, b) { return compareNumeric(a.Quantity, b.Quantity); }
function sortDataById() {
    tableData.sort(compareDataId);
    removeTable(shownColumns);
    showTable(shownColumns);
}
function sortDataByName() {
    tableData.sort(compareDataName);
    removeTable(shownColumns);
    showTable(shownColumns);
}
function sortDataByPrice() {
    tableData.sort(compareDataPrice);
    removeTable(shownColumns);
    showTable(shownColumns);
}
function sortDataByaQuantity() {
    tableData.sort(compareDataQuantity);
    removeTable(shownColumns);
    showTable(shownColumns);
}
let sortFunctions = {Id: sortDataById, Name: sortDataByName, Price: sortDataByPrice, Quantity: sortDataByaQuantity};



showNamePrice.click(function() {
    if (viewStatus === 0) {
        showTable(["Name","Price"]);
        showNamePriceQuantity.toggleClass('visibilityHidden');
        showAll.toggleClass('visibilityHidden');
        viewStatus = 1;
    }
})
showNamePriceQuantity.click (function() {
    if (viewStatus === 0) {
        showTable(["Name","Price","Quantity"]);
        showNamePrice.toggleClass('visibilityHidden');
        showAll.toggleClass('visibilityHidden');
        viewStatus = 1;
    }
})
showAll.click (function() {
    if (viewStatus === 0) {
        showTable(["Id","Name","Price","Quantity"]);
        showNamePrice.toggleClass('visibilityHidden');
        showNamePriceQuantity.toggleClass('visibilityHidden');
        viewStatus = 1;
    }
})
backup.click (function() {
    if (viewStatus === 1) {
        removeTable(shownColumns);
        showNamePrice.removeClass('visibilityHidden');
        showNamePriceQuantity.removeClass('visibilityHidden');
        showAll.removeClass('visibilityHidden');
        viewStatus = 0;
    }
})

addToTable.click(function () {
    showCover();

    $form.find("[name=Name]").css("display","none").attr("value",null);
    $form.find("[name=Id]").css("display","none").attr("value",null);
    $form.find("[name=Price]").css("display","none").attr("value",null);
    $form.find("[name=Quantity]").css("display","none").attr("value",null);

    for (let i=0; i<shownColumns.length; i++) {
        $form.find("[name="+shownColumns[i]+"]").css("display","block");
    }
    $container.css("display","block");
    $form.find('input[name=Name]').focus();
});
$form.submit(function () {
    let value;
    let $field;
    for (let i=0; i<shownColumns.length; i++) {
        $field = $("[name="+shownColumns[i]+"]");
        value = $field.val();
        if (value === "" || value === undefined) {
            alert("field is not filled");
            return false;
        }
        if (Number(value)===0 && !!value) {
            alert("incorrect input");
            $field.attr("value",null);
            return false;
        }
        if (value < 0) {
            alert("incorrect input");
            $field.attr("value",null);
            return false;
        }

    }

    let Id = $form.find("[name=Id]").val();
    let Name = $form.find("[name=Name]").val();
    let Price = $form.find("[name=Price]").val();
    let Quantity = $form.find("[name=Quantity]").val();

    if (!Id) Id = Math.floor(Math.random()*1000);
    if (!Quantity) Quantity = Math.floor((Math.random()*100));

    complete(Id,Name,Price,Quantity);
    return false;
});
$formCancel.click(function () {
    complete(null,null,null,null);
});
function complete(_Id,_Name,_Price,_Quantity) {
    if (_Id !== null) {
        removeTable(shownColumns);
        tableData.push({Id: _Id, Name: _Name, Price: _Price, Quantity: _Quantity});
        showTable(shownColumns);
    }
    hideCover();
    $container.css("display","none");
    return false;
};



function showTable(columnNames) {
  shownColumns = columnNames;
  //viewStatus=1;
  let tableContainer = $("#tableContainer");
    actionsButtons.css('display','block');
    tableContainer.append($('<table>'));
    let table=$('table');
    //генерация заголовков
    for (let i = 0; i < columnNames.length; i++) {
      table.append($('<th>').text(columnNames[i]));
      $('th:last').on('click', sortFunctions[columnNames[i]]);
  }
    //
    for (let i = 0; i < tableData.length; i++)
    {
      table.append($('<tr>'));
      if(tableData[i]['Id']==tmp) $('tr:last').addClass('red');
      $('tr:last').attr('id',i);
      for(let j=0;j < columnNames.length; j++)
      {
        $('tr:last').append($('<td>').text(tableData[i][columnNames[j]]));
      };
    }

    $('tbody').on('click', "tr", function ()
    {
      let num=$(this).attr('id');
      $('.red').removeClass('red');
      a.attr('href','buy.html?name='+tableData[num]['Name']+'&price='+tableData[num]['Price']+'&quantity='+tableData[num]['Quantity']);
      $(this).addClass('red');

    });

}


function removeTable(columnNames)
{
  //viewStatus=0;
    let tableContainer = $("#tableContainer");
    actionsButtons.css('display','none');
    th = $("#th");
    th.off();
    a.attr('href','#');
    $('tbody').off();
    tableContainer.empty();
}


function showCover()
{
    let coverDiv = document.createElement('div');
    coverDiv.id = 'coverDiv';
    document.body.appendChild(coverDiv);
}
function hideCover()
{
    document.body.removeChild(document.getElementById('coverDiv'));
}

