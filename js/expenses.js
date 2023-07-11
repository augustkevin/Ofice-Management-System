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

        //pull all bills
        firebase.firestore().collection("bills").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let theBill = doc.data().theBill;
                content += '<option value="'+theBill+'">'+theBill+'</option>';

            })
            $("#allBills").append(content);
        })


        //onchange of expenseType
        document.getElementById("expenseType").onchange = function(){
            let expenseType = document.getElementById("expenseType").value;

            if(expenseType == "Petty Cash" || expenseType == "Other Expenses"){

                document.getElementById("spentOn").style.display = "block";
                document.getElementById("allBills").style.display = "none";

            }else if (expenseType == "Recurrent Expenses"){

                document.getElementById("allBills").style.display = "block";
                document.getElementById("spentOn").style.display = "none";
            }
        }


        //add addExpense
        document.getElementById("addExpense").onclick = function(){
            let expenseType = document.getElementById("expenseType").value;
            let exAmount = document.getElementById("exAmount").value;
            let exDate = document.getElementById("exDate").value;
            let authorisedBy = document.getElementById("authorisedBy").value;
            let paymentMethod = document.getElementById("paymentMethod").value;

            let AmountSpentOn = 0;

            let spentOn = document.getElementById("spentOn").value;
            let allBills = document.getElementById("allBills").value;

            if(spentOn != ""){
                AmountSpentOn = spentOn;
            }else if(allBills != ""){
                AmountSpentOn = allBills;
            }
                        
            let addIncome = firebase.firestore().collection("expense").doc();
            addIncome.set({
                docId:addIncome.id,
                expenseType:expenseType,
                exAmount:exAmount,
                exDate:exDate,
                authorisedBy:authorisedBy,
                paymentMethod:paymentMethod,
                spentOn:AmountSpentOn

            }).then(()=>{
                window.location.reload();
            })

        }

        //view income
        firebase.firestore().collection("expense").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let expenseType = doc.data().expenseType;
                let spentOn = doc.data().spentOn;
                let exDate = doc.data().exDate;
                let exAmount = doc.data().exAmount;
                let paymentMethod = doc.data().paymentMethod;
                let authorisedBy = doc.data().authorisedBy;
                let docId = doc.data().docId;

                content+=    '<tr>';
                content+=    '  <td> ' + expenseType +'</td>';
                content+=    '  <td> ' + spentOn +'</td>';
                content+=    '  <td> ' + exDate +'</td>';
                content+=    '  <td> ' + exAmount +'</td>';
                content+=    '  <td> ' + paymentMethod +'</td>';
                content+=    '  <td> ' + authorisedBy +'</td>';
                content+=    '  <td> <button class="btn btn-danger">Delete</button> </td>';                    
                content+=    '</tr>';

            })
            $("#expenseList").append(content);
        })

    }else{

    }
})