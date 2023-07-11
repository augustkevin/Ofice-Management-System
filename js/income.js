firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        //pull paymentMethod

        firebase.firestore().collection("paymentMethod").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let pMethod = doc.data().pMethodInput;
                let docId = doc.data().docId;   
                
                content += '<option value="'+pMethod+'">'+pMethod+'</option>';

            })
            $("#paymentMethod").append(content);
        })


        //add income
        document.getElementById("addIncome").onclick = function(){
            let inAmount = document.getElementById("inAmount").value;
            let incDate = document.getElementById("incDate").value;
            let incFrom = document.getElementById("incFrom").value;
            let incDesc = document.getElementById("incDesc").value;
            let paymentMethod = document.getElementById("paymentMethod").value;

            let addIncome = firebase.firestore().collection("income").doc();
            addIncome.set({
                docId:addIncome.id,
                incDate:incDate,
                inAmount:inAmount,
                incFrom:incFrom,
                incDesc:incDesc,
                paymentMethod:paymentMethod

            }).then(()=>{
                window.location.reload();
            })

        }

        //view income
        firebase.firestore().collection("income").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let incDate = doc.data().incDate;
                let inAmount = doc.data().inAmount;
                let incFrom = doc.data().incFrom;
                let incDesc = doc.data().incDesc;
                let paymentMethod = doc.data().paymentMethod;
                let docId = doc.data().docId;

                content+=    '<tr>';
                content+=    '  <td> ' + inAmount +'</td>';
                content+=    '  <td> ' + incDate +'</td>';
                content+=    '  <td> ' + incFrom +'</td>';
                content+=    '  <td> ' + incDesc +'</td>';
                content+=    '  <td> ' + paymentMethod +'</td>';
                content+=    '  <td> <button class="btn btn-primary">Edit</button> </td>'; 
                content+=    '  <td> <button class="btn btn-danger">Delete</button> </td>';                    
                content+=    '</tr>';

            })
            $("#incomeList").append(content);
        })

    }else{

    }
})