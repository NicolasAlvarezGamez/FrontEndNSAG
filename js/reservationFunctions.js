function getReservationInfo(){
    $.ajax({
        url:"http://129.151.103.52:8080/api/Rerservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(ans){
            console.log(ans);
            $("#resultado").empty();
            showReservationAns(ans);
        }
        });

}

function showReservationAns(ans){
    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" FECHA SALIDA "+"</td>";
    mytable+="<td>"+" FECHA REGRESO"+"</td>";
    mytable+="<td>"+" ESTADO "+"</td>";
    mytable+="<td>"+" PUNTAJE "+"</td>";
    for(i=0;i<ans.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+ans[i].idReservation+"</td>";
        mytable+="<td>"+ans[i].startDate+"</td>";
        mytable+="<td>"+ans[i].devolutionDate+"</td>";
        mytable+="<td>"+ans[i].status+"</td>";
        mytable+="<td>"+ans[i].score+"</td>";
        mytable+="<td> <button onclick='rerservationDelete("+ans[i].idReservation+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").html(mytable);

}

function saveReservationInfo(){
    let myData={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        score:$("#score").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Rerservation/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),

        success:function(ans){
            console.log(ans);
            console.log("Se Guardó Correctamente");
            alert("Se Guardó Correctamente")
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            $("#score").val("");
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Guardó Correctamente");
        }
        });
}

function editRerservation(idElemento){
    let myData={
        idReservation:idElemento,
        idReservation:$("#idReservation").val(),
        Rerservation:$("#startDate").val(),
        stars:$("#devolutionDate").val(),
        category_id:$("#status").val(),
        description:$("#score").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http:/129.151.103.52:8080/api/Rerservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            $("#score").val("");
            getRerservationInfo();
            alert("Se Actualizó Correctamente")
        }
        });
}

function RerservationDelete(idElemento){
    let myData={
        idReservation:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Rerservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            getRerservationInfo();
            alert("Se Eliminó Correctamente")
        }
        });
}
