firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        //add payment method
        document.getElementById("saveaddPayment").onclick = function(){
            let pMethodInput = document.getElementById("pMethodInput").value;

            let addPayment = firebase.firestore().collection("paymentMethod").doc();
            addPayment.set({
                pMethodInput:pMethodInput,
                docId:addPayment.id
            }).then(()=>{
                window.location.reload();
            })
        }


        //add payent cycle
        document.getElementById("saveCycle").onclick = function(){
            let cyclename = document.getElementById("cyclename").value;

            let addCycle = firebase.firestore().collection("paymentCycle").doc();
            addCycle.set({

                cyclename:cyclename,
                docId:addCycle.id

            }).then(()=>{
                window.location.reload();
            })
        }

        //view payment method
        firebase.firestore().collection("paymentMethod").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let pMethod = doc.data().pMethodInput;
                let docId = doc.data().docId;

                content+=    '<tr>';
                content+=    '  <td> ' + pMethod +'</td>';
                content+=    '  <td> <button class="btn btn-danger">Delete</button> </td>';                    
                content+=    '</tr>';

            })
            $("#paymentMethodList").append(content);
        })

        //view payment cycle
        firebase.firestore().collection("paymentCycle").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let cyclename = doc.data().cyclename;
                let docId = doc.data().docId;

                content+=    '<tr>';
                content+=    '  <td> ' + cyclename +'</td>';
                content+=    '  <td> <button class="btn btn-danger">Delete</button> </td>';                    
                content+=    '</tr>';

            })
            $("#paymentCycleList").append(content);
        })

    }else{
        window.location.href = "index.html";
    }
})