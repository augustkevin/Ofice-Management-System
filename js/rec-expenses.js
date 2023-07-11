firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        //pull payment Cycle

        firebase.firestore().collection("paymentCycle").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let cyclename = doc.data().cyclename;
                let docId = doc.data().docId;   
                
                content += '<option value="'+cyclename+'">'+cyclename+'</option>';

            })
            $("#paymentCycle").append(content);
        })


        //add bills
        document.getElementById("addBills").onclick = function(){
            let billAmount = document.getElementById("billAmount").value;
            let theBill = document.getElementById("theBill").value;
            let paymentCycle = document.getElementById("paymentCycle").value;

            let addBills = firebase.firestore().collection("bills").doc();
            addBills.set({
                docId:addBills.id,
                billAmount:billAmount,
                theBill:theBill,
                paymentCycle:paymentCycle,

            }).then(()=>{
                window.location.reload();
            })

        }

        //view bills
        firebase.firestore().collection("bills").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let billAmount = doc.data().billAmount;
                let theBill = doc.data().theBill;
                let paymentCycle = doc.data().paymentCycle;
                let docId = doc.data().docId;

                content+=    '<tr>';
                content+=    '  <td> ' + theBill +'</td>';
                content+=    '  <td> ' + billAmount +'</td>';
                content+=    '  <td> ' + paymentCycle +'</td>';
                content+=    '  <td> <button class="btn btn-primary">Edit</button> </td>'; 
                content+=    '  <td> <button class="btn btn-danger">Delete</button> </td>';                    
                content+=    '</tr>';

            })
            $("#billList").append(content);
        })

    }else{

    }
})