function getAdminInfo(){
    $.ajax({
        url:"http://129.151.103.52:8080/api/Admin/all",
        type:"GET",
        datatype:"JSON",
        success:function(ans){
            console.log(ans);
            $("#resultado").empty();
            showAdminAns(ans);
        }
        });

}

function showAdminAns(ans){
    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NOMBRE "+"</td>";
    mytable+="<td>"+" EMAIL"+"</td>";
    mytable+="<td>"+" CONTRASEÑA "+"</td>";
    for(i=0;i<ans.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+ans[i].idAdmin+"</td>";
        mytable+="<td>"+ans[i].name+"</td>";
        mytable+="<td>"+ans[i].email+"</td>";
        mytable+="<td>"+ans[i].password+"</td>";
        mytable+="<td> <button onclick='adminDelete("+ans[i].idAdmin+")'>Eliminar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").html(mytable);

}

function saveAdminInfo(){
    let myData={
        idAdmin:$("#idAdmin").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Admin/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),
        
        success:function(ans){
            console.log(ans);
            console.log("Se Guardó Correctamente");
            alert("Se Guardó Correctamente");
            $("#resultado").empty();
            $("#idAdmin").val("");
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Guardó Correctamente");
        }   
        });
}

function adminEdit(){
    let myData={
        idAdmin:$("#idAdmin").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Admin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            $("#idAdmin").val("");
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            getAdminInfo();
            alert("Se Actualizó Correctamente")
        }
        });
}

function adminDelete(idElemento){
    let myData={
        idAdmin:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Admin/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            getAdminInfo();
            alert("Se Eliminó Correctamente")
        }
        });
}
