function getRoomInfo(){
    $.ajax({
        url:"http://129.151.103.52:8080/api/Room/all",
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
    mytable+="<td>"+" HOTEL"+"</td>";
    mytable+="<td>"+" ESTRELLAS "+"</td>";
    mytable+="<td>"+" DESCRIPCIÓN "+"</td>";
    for(i=0;i<ans.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+ans[i].id+"</td>";
        mytable+="<td>"+ans[i].name+"</td>";
        mytable+="<td>"+ans[i].hotel+"</td>";
        mytable+="<td>"+ans[i].stars+"</td>";
        mytable+="<td>"+ans[i].description+"</td>";
        mytable+="<td> <button onclick='roomDelete("+ans[i].id+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").html(mytable);

}

function saveRoomInfo(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Room/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),

        success:function(ans){
            console.log(ans);
            console.log("Se Guardó Correctamente");
            alert("Se Guardó Correctamente")
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#hotel").val("");
            $("#stars").val("");
            $("#description").val("");
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Guardó Correctamente");
        }
        });
}

function editRoom(idElemento){
    let myData={
        id:idElemento,
        id:$("#id").val(),
        name:$("#name").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description").val(),
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Room/update",
        type:"PUT",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",

        success:function(ans){
            console.log(ans);
            console.log("Se Actualizó Correctamente")
            alert("Se Actualizó Correctamente")
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#hotel").val("");
            $("#stars").val("");
            $("#description").val("");
            getRoomInfo();
            
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Actualizó Correctamente");
        }    
        });
}

function roomDelete(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Room/"+idElemento ,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            getRoomInfo();
            alert("Se Eliminó Correctamente")
        },

        });
}
