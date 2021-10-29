function getCategoryInfo(){
    $.ajax({
        url:"http://129.151.103.52:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(ans){
            console.log(ans);
            $("#resultado").empty();
            showCategoryAns(ans);
        }
        });

}

function showCategoryAns(ans){
    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NAME "+"</td>";
    mytable+="<td>"+" DESCRIPTION"+"</td>";
    for(i=0;i<ans.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+ans[i].id+"</td>";
        mytable+="<td>"+ans[i].name+"</td>";
        mytable+="<td>"+ans[i].description+"</td>";
        mytable+="<td> <button onclick='categoryDelete("+ans[i].id+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").html(mytable);

}

function saveCategoryInfo(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Category/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),

        success:function(ans){
            console.log(ans);
            console.log("Se Guardó Correctamente");
            alert("Se Guardó Correctamente");
            $("#resultado").empty();
            $("#name").val("");
            $("#description").val("");
            
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Guardó Correctamente");
        }
        });
}

function editCategory(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Category/update",
        type:"PUT",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),

        success:function(ans){
            console.log(ans);
            console.log("Se Actualizó Correctamente");
            alert("Se Actualizó Correctamente");
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            
        },
        
        
    }
     );
}

function categoryDelete(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            getCategoryInfo();
            alert("Se Eliminó Correctamente")
        }
        });
}
