var arr=["Asad","deer ","sdf","Arun","Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack",
  "Karen", "Leo", "Mona", "Nina", "Oscar", "Paul", "Quincy", "Rachel", "Steve", "Tina",
  "Uma", "Victor", "Wendy", "Xander", "Yara", "Zack", "Anna", "Ben", "Cathy", "Derek",
  "Ella", "Felix", "Gina", "Harry", "Isla", "Jake", "Kara", "Liam", "Mia", "Noah",
  "Olivia", "Pete", "Quinn", "Riley", "Sam", "Tara", "Umar", "Vera", "Will", "Xena",
  "Yvonne", "Zane", "Aaron", "Bella", "Cody", "Diana", "Ethan", "Fiona", "George", "Hazel",
  "Ian", "Jade", "Kyle", "Luna", "Mason", "Nora", "Owen", "Penny", "Quin", "Ruby",
  "Seth", "Tessa", "Uriah", "Violet", "Wyatt", "Xyla", "Yosef", "Zelda", "Abby", "Blake",
  "Cara", "Duke", "Eva", "Finn", "Gwen", "Hugo", "Iris", "Jace", "Kira", "Liam",
  "Maya", "Nate", "Olive", "Parker", "Quinn", "Rory", "Sadie", "Toby", "Uma", "Vince",
  "Willa", "Xander", "Yara", "Zeke", "Ava", "Brett", "Clara", "Drew", "Eli", "Faith",
  "Gabe", "Hope", "Ivy", "Jude", "Kai", "Lila", "Miles", "Nina", "Otis", "Paige",
  "Quinn", "Remy", "Sasha", "Tate", "Ursula", "Vera", "Wade", "Xena", "Yara", "Zane",
  "Aiden", "Bree", "Cruz", "Daisy", "Eli", "Faye", "Gus", "Hana", "Ira", "Jett",
  "Kora", "Luca", "Mira", "Nico", "Opal", "Pax", "Quinn", "Rosa", "Sage", "Tess",
  "Umar", "Veda", "Wren", "Xyla", "Yara", "Zeke", "Aria", "Beck", "Cora", "Dax",
  "Eva", "Finn", "Gia", "Hank", "Isla", "Jax", "Kai", "Lena", "Milo", "Nia",
  "Owen", "Pia", "Quinn", "Remy", "Sia", "Tate", "Uma", "Vera", "Wade", "Xena",
  "Yara", "Zane", "Ava", "Brett", "Clara", "Drew", "Eli", "Faith", "Gabe", "Hope",
  "Ivy", "Jude", "Kai", "Lila", "Miles", "Nina", "Otis", "Paige", "Quinn", "Remy",
  "Sasha", "Tate", "Ursula", "Vera", "Wade", "Xena", "Yara", "Zane", "Aiden", "Bree",
  "Cruz", "Daisy", "Eli", "Faye", "Gus", "Hana", "Ira", "Jett", "Kora", "Luca",
  "Mira", "Nico", "Opal", "Pax", "Quinn", "Rosa", "Sage", "Tess", "Umar", "Veda",
  "Wren", "Xyla", "Yara", "Zeke", "Aria", "Beck", "Cora", "Dax", "Eva", "Finn",
  "Gia", "Hank", "Isla", "Jax", "Kai", "Lena", "Milo", "Nam"];

function bloodBank(){
 var name= document.getElementById("Name").value;
 var age=document.getElementById("Age").value;

var eligibleAge;

 var bloodGroup=document.getElementById("Group").value;
 var positive=document.getElementById("Positive")
 var negative=document.getElementById("negative") 
var phone =document.getElementById("phone").value;

var email=document.getElementById("email").value;

var male=document.getElementById("Male")
var female=document.getElementById("female")


var gender;

if(isNaN(name)){

  if(!isNaN(age) && age>18 && age<100){
   var eligibleAge=age
   if(bloodGroup.toLowerCase()=="a"||bloodGroup.toLowerCase()=="b" ||bloodGroup.toLowerCase()=="ab"||bloodGroup.toLowerCase()=="o"){
    if(positive.checked){
    bloodGroup= bloodGroup.toUpperCase()
  bloodGroup+="+"
  
  if(male.checked){
    gender="Male"
  
  if(!isNaN(phone)){
  
    phone=phone
    var containerOfForm=document.getElementById("form")
    containerOfForm.style.display="none"
    alert(`you're registered successfully`)
    var donorDetail=document.getElementById("detailOfDonor")
    donorDetail.style.display="block";
    donorDetail.innerHTML=" <br><br> <br> <br><h1>"+"Details of Donor:"+"</h1><br><br><br>";
    var imageUrl = "assets/images/Profile.png"; 
    donorDetail.innerHTML += "<img src='" + imageUrl + "' alt='Donor Image' style='width:200px; height:200px; padding:2rem;'>";
    donorDetail.innerHTML+="<h4>"+"Name: "+name+"</h4>";
    donorDetail.innerHTML+="<h4>"+"Age: "+eligibleAge+"</h4>";
    donorDetail.innerHTML+="<h4>"+"Blood Group: "+bloodGroup+"</h4>";
    donorDetail.innerHTML+="<h4>"+"Blood Group: "+gender+"</h4>";
    donorDetail.innerHTML+="<h4>"+"Phone Number: "+phone+"</h4>";
    donorDetail.innerHTML+="<h4>"+"Email: "+email+"</h4>";
    donorDetail.innerHTML+="<img>"+"</img>"
    
    var success=document.getElementById("success")
    success.style.display="block"
    
    var Ap=document.getElementById("Ap")
    var An=document.getElementById("An")
    
    var Bp=document.getElementById("Bp")
    var Bn=document.getElementById("Bn")
    var ABp=document.getElementById("ABp")
    var ABn=document.getElementById("ABn")
    var Op=document.getElementById("Op")
    var On=document.getElementById("On")
    
    if(bloodGroup=="A+"){
    
    Ap.style.display="block";
    ABp.style.display="block";
    
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="A-"){
    
    An.style.display="block";
    ABp.style.display="block";
    Ap.style.display="block";
    ABp.style.display="block";
    
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="B+"){
    
    Bp.style.display="block";
    ABp.style.display="block";
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="B-"){
    
    
    Bn.style.display="block";
    Bp.style.display="block";
    ABp.style.display="block";
    ABn.style.display="block";
    
    
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="AB+"){
    
    
    ABp.style.display="block";
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="AB-"){
    
    ABp.style.display="block";
    ABn.style.display="block";
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="O+"){
    
    Op.style.display="block";
    Ap.style.display="block";
    Bp.style.display="block";
    ABp.style.display="block";
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    }else if(bloodGroup=="O-"){
      Bn.style.display="block";
      Bp.style.display="block";
      ABp.style.display="block";
      ABn.style.display="block";
    Ap.style.display="block";
    An.style.display="block";  
    Op.style.display="block";
    On.style.display="block";
    var checkRecipient=document.getElementById("checkDetail")
    checkRecipient.style.display="block";
    
    }
    
  
  }else{
    alert("Please enter phone number")
  }
  
    }else if(female.checked){
      gender="Female"
  
      if(!isNaN(phone)){
  
        phone=phone
  
        var containerOfForm=document.getElementById("form")
        containerOfForm.style.display="none"
        alert(`you're registered successfully`)
        var donorDetail=document.getElementById("detailOfDonor")
        donorDetail.style.display="block";
        donorDetail.innerHTML=" <br><br> <br> <br><h1>"+"Details of Donor:"+"</h1><br><br><br>";
        var imageUrl = "assets/images/Profile.png"; 
        donorDetail.innerHTML += "<img src='" + imageUrl + "' alt='Donor Image' style='width:200px; height:200px; padding:2rem;'>";
        donorDetail.innerHTML+="<h4>"+"Name: "+name+"</h4>";
        donorDetail.innerHTML+="<h4>"+"Age: "+eligibleAge+"</h4>";
        donorDetail.innerHTML+="<h4>"+"Blood Group: "+bloodGroup+"</h4>";
        donorDetail.innerHTML+="<h4>"+"Blood Group: "+gender+"</h4>";
        donorDetail.innerHTML+="<h4>"+"Phone Number: "+phone+"</h4>";
        donorDetail.innerHTML+="<h4>"+"Email: "+email+"</h4>";
        donorDetail.innerHTML+="<img>"+"</img>"
        
        var success=document.getElementById("success")
        success.style.display="block"
        
        var Ap=document.getElementById("Ap")
        var An=document.getElementById("An")
        
        var Bp=document.getElementById("Bp")
        var Bn=document.getElementById("Bn")
        var ABp=document.getElementById("ABp")
        var ABn=document.getElementById("ABn")
        var Op=document.getElementById("Op")
        var On=document.getElementById("On")
        
        if(bloodGroup=="A+"){
        
        Ap.style.display="block";
        ABp.style.display="block";
        
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="A-"){
        
        An.style.display="block";
        ABp.style.display="block";
        Ap.style.display="block";
        ABp.style.display="block";
        
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="B+"){
        
        Bp.style.display="block";
        ABp.style.display="block";
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="B-"){
        
        
        Bn.style.display="block";
        Bp.style.display="block";
        ABp.style.display="block";
        ABn.style.display="block";
        
        
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="AB+"){
        
        
        ABp.style.display="block";
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="AB-"){
        
        ABp.style.display="block";
        ABn.style.display="block";
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="O+"){
        
        Op.style.display="block";
        Ap.style.display="block";
        Bp.style.display="block";
        ABp.style.display="block";
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        }else if(bloodGroup=="O-"){
          Bn.style.display="block";
          Bp.style.display="block";
          ABp.style.display="block";
          ABn.style.display="block";
        Ap.style.display="block";
        An.style.display="block";  
        Op.style.display="block";
        On.style.display="block";
        var checkRecipient=document.getElementById("checkDetail")
        checkRecipient.style.display="block";
        
        }
        
  
      }else{
        alert("Please enter phone number")
      }
  
  }else{
    alert("Please select gender")
  }
  
  
  
    }else if(negative.checked){
     bloodGroup= bloodGroup.toUpperCase();
   bloodGroup+="-"
  
  
  
   if(male.checked){
    gender="Male"
    if(!isNaN(phone)){
  
      phone=phone
  
  
      var containerOfForm=document.getElementById("form")
  containerOfForm.style.display="none"
  
  alert(`you're registered successfully`)
  var donorDetail=document.getElementById("detailOfDonor")
  donorDetail.style.display="block";
  donorDetail.innerHTML=" <br><br> <br> <br><h1>"+"Details of Donor:"+"</h1><br><br><br>";
  var imageUrl = "assets/images/Profile.png"; 
  donorDetail.innerHTML += "<img src='" + imageUrl + "' alt='Donor Image' style='width:200px; height:200px; padding:2rem;'>";
  donorDetail.innerHTML+="<h4>"+"Name: "+name+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Age: "+eligibleAge+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Blood Group: "+bloodGroup+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Blood Group: "+gender+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Phone Number: "+phone+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Email: "+email+"</h4>";
  donorDetail.innerHTML+="<img>"+"</img>"
  
  var success=document.getElementById("success")
  success.style.display="block"
  
  var Ap=document.getElementById("Ap")
  var An=document.getElementById("An")
  
  var Bp=document.getElementById("Bp")
  var Bn=document.getElementById("Bn")
  var ABp=document.getElementById("ABp")
  var ABn=document.getElementById("ABn")
  var Op=document.getElementById("Op")
  var On=document.getElementById("On")
  
  if(bloodGroup=="A+"){
  
  Ap.style.display="block";
  ABp.style.display="block";
  
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="A-"){
  
  An.style.display="block";
  ABp.style.display="block";
  Ap.style.display="block";
  ABp.style.display="block";
  
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="B+"){
  
  Bp.style.display="block";
  ABp.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="B-"){
  
  
  Bn.style.display="block";
  Bp.style.display="block";
  ABp.style.display="block";
  ABn.style.display="block";
  
  
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="AB+"){
  
  
  ABp.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="AB-"){
  
  ABp.style.display="block";
  ABn.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="O+"){
  
  Op.style.display="block";
  Ap.style.display="block";
  Bp.style.display="block";
  ABp.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="O-"){
    Bn.style.display="block";
    Bp.style.display="block";
    ABp.style.display="block";
    ABn.style.display="block";
  Ap.style.display="block";
  An.style.display="block";  
  Op.style.display="block";
  On.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  
  }
  
    }else{
      alert("Please enter phone number")
    }
  
    }else if(female.checked){
      gender="Female"
  
  
  
      if(!isNaN(phone)){
  
        phone=phone
        var containerOfForm=document.getElementById("form")
  containerOfForm.style.display="none"
  
  alert(`you're registered successfully`)
  var donorDetail=document.getElementById("detailOfDonor")
  donorDetail.style.display="block";
  donorDetail.innerHTML=" <br><br> <br> <br><h1>"+"Details of Donor:"+"</h1><br><br><br>";
  var imageUrl = "assets/images/Profile.png"; 
  donorDetail.innerHTML += "<img src='" + imageUrl + "' alt='Donor Image' style='width:200px; height:200px; padding:2rem;'>";
  donorDetail.innerHTML+="<h4>"+"Name: "+name+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Age: "+eligibleAge+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Blood Group: "+bloodGroup+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Blood Group: "+gender+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Phone Number: "+phone+"</h4>";
  donorDetail.innerHTML+="<h4>"+"Email: "+email+"</h4>";
  donorDetail.innerHTML+="<img>"+"</img>"
  
  var success=document.getElementById("success")
  success.style.display="block"
  
  var Ap=document.getElementById("Ap")
  var An=document.getElementById("An")
  
  var Bp=document.getElementById("Bp")
  var Bn=document.getElementById("Bn")
  var ABp=document.getElementById("ABp")
  var ABn=document.getElementById("ABn")
  var Op=document.getElementById("Op")
  var On=document.getElementById("On")
  
  if(bloodGroup=="A+"){
  
  Ap.style.display="block";
  ABp.style.display="block";
  
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="A-"){
  
  An.style.display="block";
  ABp.style.display="block";
  Ap.style.display="block";
  ABp.style.display="block";
  
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="B+"){
  
  Bp.style.display="block";
  ABp.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="B-"){
  
  
  Bn.style.display="block";
  Bp.style.display="block";
  ABp.style.display="block";
  ABn.style.display="block";
  
  
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="AB+"){
  
  
  ABp.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="AB-"){
  
  ABp.style.display="block";
  ABn.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="O+"){
  
  Op.style.display="block";
  Ap.style.display="block";
  Bp.style.display="block";
  ABp.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  }else if(bloodGroup=="O-"){
    Bn.style.display="block";
    Bp.style.display="block";
    ABp.style.display="block";
    ABn.style.display="block";
  Ap.style.display="block";
  An.style.display="block";  
  Op.style.display="block";
  On.style.display="block";
  var checkRecipient=document.getElementById("checkDetail")
  checkRecipient.style.display="block";
  
  }
  
      }else{
        alert("Please enter phone number")
      }
  }else{
    alert("Please select gender")
  }
    }else {
     alert(`select your group`)
    }
   }
  }else{
    alert(`you are not eligible to donate`)
  }
  
  
  }else{
    alert("Enter valid name")
  }




}


