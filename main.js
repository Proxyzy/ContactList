var people = [];


function setDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)
  {
      dd='0'+dd;
  }

  if(mm<10)
  {
      mm='0'+mm;
  }
  today = yyyy+'-'+mm+'-'+dd;

  var start = '1900-'+mm+'-'+dd;
  document.getElementById("birth").setAttribute('max', today);
  document.getElementById("birth").setAttribute('min', start);
  document.getElementById("birthEdit").setAttribute('max', today);
  document.getElementById("birthEdit").setAttribute('min', start);
}
getContacts();
setDate();

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function saveContacts(){
  var str = JSON.stringify(people);
  localStorage.setItem("people", str);
}

function getContacts(){
  text = localStorage.getItem("people");
  people = JSON.parse(text);
}

function addPerson(person) {
  var node = document.createElement("LI");
  var textnode = document.createTextNode(person.firstname);
  var span = document.createElement("SPAN");
  span.classList.add("listSpan")
  span.appendChild(textnode)
  node.appendChild(span);
  span = document.createElement("SPAN");
  textnode = document.createTextNode(person.lastname)
  span.classList.add("listSpan")
  span.appendChild(textnode);
  node.appendChild(span);
  span = document.createElement("SPAN");
  textnode = document.createTextNode(person.date)
  span.classList.add("listSpan")
  span.appendChild(textnode);
  node.appendChild(span);
  span = document.createElement("SPAN");
  textnode = document.createTextNode(person.phone)
  span.classList.add("listSpan")
  span.appendChild(textnode);
  node.appendChild(span);
  span = document.createElement("SPAN");
  textnode = document.createTextNode(person.email)
  span.classList.add( "listSpan", "longSpan");
  span.appendChild(textnode);
  node.appendChild(span);
  span = document.createElement("SPAN");
  textnode = document.createTextNode(person.address)
  span.classList.add( "listSpan", "longSpan");
  span.appendChild(textnode);
  node.appendChild(span);
  var removeBtn = document.createElement("input");
  removeBtn.type = "button";
  removeBtn.value = "Remove";
  removeBtn.classList.add("listBtn");
  removeBtn.onclick = remove;
  removeBtn.id=person.id;
  node.appendChild(removeBtn);
  document.getElementById("list").appendChild(node);
  var editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "Edit";
  editBtn.classList.add("listBtn");
  editBtn.onclick = openEditModal;
  editBtn.id=person.id;
  node.appendChild(editBtn);
}

function openEditModal(e){
  person = people.filter(function(person) {
	return person.id == e.target.id;
});
  document.getElementById("pId").value = person[0].id;
  document.getElementById("nameEdit").value = person[0].firstname;
  document.getElementById("lastnameEdit").value = person[0].lastname;
  document.getElementById("birthEdit").value = person[0].date;
  document.getElementById("phoneEdit").value = person[0].phone;
  document.getElementById("emailEdit").value = person[0].email;
  document.getElementById("addressEdit").value = person[0].address;
  modal.style.display = "block";
}

function updatePerson(){

  var validateE = validateEmail(document.getElementById("emailEdit").value, document.getElementById("pId").value);
  var validateP = validatePhone(document.getElementById("phoneEdit").value, document.getElementById("pId").value);

  if(validateE && validateP){
    var id = document.getElementById("pId").value;
    personIndex = people.findIndex((person => person.id == id));
    people[personIndex].firstname = document.getElementById("nameEdit").value;
    people[personIndex].lastname = document.getElementById("lastnameEdit").value;
    people[personIndex].date = document.getElementById("birthEdit").value;
    people[personIndex].phone = document.getElementById("phoneEdit").value;
    people[personIndex].email = document.getElementById("emailEdit").value;
    people[personIndex].address = document.getElementById("addressEdit").value;
    saveContacts();
    location.reload();

  }else if(!validateE && !validateP){
    document.getElementById('errorEdit').removeAttribute("hidden");
    document.getElementById("errorEdit").innerHTML = "Email and Phone Number Already in Use";
  }else if(!validateE){
    document.getElementById('errorEdit').removeAttribute("hidden");
    document.getElementById("errorEdit").innerHTML = "Email is Already in Use";
  }else if(!validateP){
    document.getElementById('errorEdit').removeAttribute("hidden");
    document.getElementById("errorEdit").innerHTML = "Phone Numper is Already in Use";
  }
}

function remove(e) {
  var el = e.target;
  el.parentNode.remove();
  var newPeople =  people.filter(function(person) {
	return person.id != e.target.id;
});
  people = newPeople;
  saveContacts();
}

function loadUL() {
    for(var i = 0; i < people.length; i++) {
        addPerson(people[i]);
    }
}

function validateEmail(email, id){
  const foundEmail = people.find(person => person.email == email && person.id != id);

  if(foundEmail){
    return false;
  }else{
    return true;
  }
}

function validatePhone(phone, id){
  const foundPhone = people.find(person => person.phone == phone && person.id != id);
  if(foundPhone){
    return false;
  }else{
    return true;
  }
}

function add(){
  var person = {
    id: people.length+1,
    firstname: document.getElementById("name").value,
    lastname: document.getElementById("lastname").value,
    date: document.getElementById("birth").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value
  };
  var validateE = validateEmail(person.email, person.id);
  var validateP = validatePhone(person.phone, person.id);

  if(validateE && validateP){
    people.push(person)
    saveContacts()
    addPerson(person);
    location.reload();
  }else if(!validateE && !validateP){
    document.getElementById('error').removeAttribute("hidden");
    document.getElementById("error").innerHTML = "Email and Phone Number Already in Use";
  }else if(!validateE){
    document.getElementById('error').removeAttribute("hidden");
    document.getElementById("error").innerHTML = "Email is Already in Use";
  }else if(!validateP){
    document.getElementById('error').removeAttribute("hidden");
    document.getElementById("error").innerHTML = "Phone Number is Already in Use";
  }
}

document.getElementById('list').appendChild(loadUL());
