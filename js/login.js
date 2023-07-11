document.getElementById("login").onclick = function(){

    let email =document.getElementById("email").value;
    let password =document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred) =>{

        //get the user id
        let userId = userCred.user.uid;

        //check the usertype
        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{

            let userType = doc.data().userType; 

            if(userType == "admin"){
                window.location.href = "dashboard.html";
            }else if(userType == "finance"){
                window.location.href = "finance/dashboard.html";
            }else if(userType == "hr"){
                window.location.href = "hr/dashboard.html";
            }else{
                alert("no user")
            }
        })



    }).catch((error)=>{

        let errorMsg =error.message;

        alert(errorMsg)
    })


}