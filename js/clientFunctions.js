function getClientInfo(){
    $.ajax({
        url:"http://129.151.103.52:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(ans){
            console.log(ans);
            $("#resultado").empty();
            showClientAns(ans);
        }
        });

}

function showClientAns(ans){
    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NOMBRE "+"</td>";
    mytable+="<td>"+" EMAIL"+"</td>";
    mytable+="<td>"+" EDAD "+"</td>";
    for(i=0;i<ans.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+ans[i].idClient+"</td>";
        mytable+="<td>"+ans[i].name+"</td>";
        mytable+="<td>"+ans[i].email+"</td>";
        mytable+="<td>"+ans[i].age+"</td>";
        mytable+="<td> <button onclick='clientDelete("+ans[i].idClient+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").html(mytable);

}

function saveClientInfo(){
    let myData={
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Client/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),
        
        success:function(ans){
            console.log(ans);
            console.log("Se Guardó Correctamente");
            alert("Se Guardó Correctamente");
            $("#resultado").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Guardó Correctamente");
        }   
        });
}

function clientEdit(){
    let myData={
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            getClientInfo();
            alert("Se Actualizó Correctamente")
        }
        });
}

function clientDelete(idElemento){
    let myData={
        idClient:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            getClientInfo();
            alert("Se Eliminó Correctamente")
        }
        });
}
