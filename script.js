var counter;

function onSubmitForm()
{
    event.preventDefault();
    

    var data=readData();

    if(data.userid == '' && data.itnumber=='' && data.title=='' && data.msg=='')
    {
        alert("Please fill all boxes");
       return 0;
    }
    if(counter==null)
    {
        addData(data);
    }
    else
    {
        updateform(data);
    }
    onResetForm();
}

function readData()
{
    var data = {};

    data['userid']=document.getElementById("userid").value;
    data['itnumber']=document.getElementById("itnumber").value;
    data['title']=document.getElementById("title").value;
    data['msg']=document.getElementById("msg").value;

    return data;

}

function addData(data)
{
    var table=document.getElementById("storelist").getElementsByTagName("tbody")[0];

    var newrow=table.insertRow(table.length);
    cell1=newrow.insertCell(0);
    cell1.innerHTML=data.userid;
    cell2=newrow.insertCell(1);
    cell2.innerHTML=data.itnumber;
    cell3=newrow.insertCell(2);
    cell3.innerHTML=data.title;
    cell4=newrow.insertCell(3);
    cell4.innerHTML=data.msg;
    cell5=newrow.insertCell(4);
    cell5.innerHTML=` <button type="Edit" class="btn btn-primary" onclick="editform(this)">Edit</button>
    <button type="Delete" class="btn btn-danger"  onclick="delform(this)">Delete</button>`

}

function onResetForm()
{
    document.getElementById("userid").value='';
    document.getElementById("itnumber").value='';
    document.getElementById("title").value='';
    document.getElementById("msg").value='';
    counter=null;
}

function delform(r)
{
    if(confirm("Do you want to Delete Data Permanentely ?"))
    {
       row=r.parentNode.parentNode.rowIndex;
       document.getElementById("storelist").deleteRow(row);
       onResetForm();
    }
}

function editform(td)
{
    counter=td.parentElement.parentElement;
    document.getElementById("userid").value=counter.cells[0].innerHTML;
    document.getElementById("itnumber").value=counter.cells[1].innerHTML;
    document.getElementById("title").value=counter.cells[2].innerHTML;
    document.getElementById("msg").value=counter.cells[3].innerHTML;
}

function updateform(data)
{
    counter.cells[0].innerHTML=data.userid;
    counter.cells[1].innerHTML=data.itnumber;
    counter.cells[2].innerHTML=data.title;
    counter.cells[3].innerHTML=data.msg;
}

fetch("data.json")
  .then((data) => {
    return data.json(); // convert into object jason format
  })
  .then((objData) => {
    console.log(objData[0].userid);

    let tbldata = " ";
    objData.map((values) => {
      tbldata +=
       `<tr>
      <td>${values.userid}</td>
      <td>${values.itnumber}</td>
      <td>${values.title}</td>
      <td>${values.msg}</td>
      <td>
      <button type="Edit" class="btn btn-primary" onclick="editform(this)">Edit</button>
      <button type="Delete" class="btn btn-danger"  style=" margin-top: 3px"   onclick="delform(this)">Delete</button>
      </td>
       </tr>`
    });
    document.getElementById("tablebody").innerHTML = tbldata;
  });
