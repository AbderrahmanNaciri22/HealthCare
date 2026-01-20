let perssones = [];
   let nom = document.getElementById("nom");
   let prenom = document.getElementById("prenom");
   let tele = document.getElementById("tele");
   let email = document.getElementById("email");
   let motif = document.getElementById("motif");
   let date = document.getElementById("date");
   let submit = document.getElementById("action");
   let message = document.getElementById("msg");
   let message0 = document.getElementById("message");
   let CountPg = document.getElementById("CountPg");
   let currentPage = 1;       
   let rowsPerPage = 5; 
function ModalAjouter(){
   nom.value = "";
   prenom.value ="";
   tele.value = "";
   email.value = ""
   motif.value = ""
   date.value =""

   let ModalAjouter ;
   ModalAjouter = document.getElementById("ModalAjouter");
   ModalAjouter.style.display = "block";
   overlay = document.getElementById("overlay");
   overlay.style.display = "block";
   submit.innerHTML=`<button class="submit" id="submit" onclick="Ajouter()">Ajouter la Demande</button><button class="table" onclick="Close()">close</button>`


}
function Close(){
   let ModalAjouter ;
   ModalAjouter = document.getElementById("ModalAjouter");
   ModalAjouter.style.display = "none";
   overlay.style.display = "none";


}

function saveToLocal(data) {

    localStorage.setItem("perssons", JSON.stringify(data));
}

function loadFromLocal() {
    const data = JSON.parse(localStorage.getItem('perssons'));
    if (data) {
        perssones = data;
        console.log("Loaded from localStorage:", perssones);
    }
    return perssones;
}

function Delet(id){
   loadperssones();
   perssones.splice(id, 1);
   saveToLocal(perssones)
   location.reload();
}

function ModiferModal(id){
   loadperssones();
   // console.log(perssones[id].nom) ;
   ModalAjouter()
   nom.value = perssones[id].nom;
   prenom.value = perssones[id].prenom
   tele.value = perssones[id].telephone
   email.value = perssones[id].email
   motif.value = perssones[id].motif
   date.value = perssones[id].date
   action.innerHTML =`<button id="submit" onclick="ModiferPerssone(${id})">Modifer</button> <button class="table" onclick="Close()">close</button>`;
}

function ModiferPerssone(id){
   let data = JSON.parse(localStorage.getItem('perssons'))
   
   data.forEach((el,i) => {
      if(i == id) {
         el.nom = nom.value;
         el.prenom = prenom.value;
         el.telephone = tele.value
         el.email = email.value
         el.motif = motif.value
         el.date = date.value
      }
   })

   saveToLocal(data)
   Close();
   loadperssones();
   // perssones[id].nom = nom.value;
   // console.log( perssones[id].nom);
}
function Ajouter(){

   if(nom.value == "" ||prenom.value ==""||tele.value == "" ||  email.value == "" || motif.value =="" || date.value == ""){
      if(nom.value == ""){
         nom.style.border ="1px solid red";
      }else if(prenom.value == ""){
         prenom.style.border ="1px solid red";
      }else if(tele.value == ""){
         tele.style.border ="1px solid red";
      }else if(email.value == ""){
         email.style.border ="1px solid red";
      }else if(motif.value =="" ){
         motif.style.border ="1px solid red";
      }else if(date.value =="" ){
         date.style.border ="1px solid red";
      }
        setTimeout(() => {
      message0.style.display = "block";
      message0.classList.add("Verify0")
      message0.textContent = "Veuillez compléter les champs obligatoires"
      });
      setTimeout(() => {
         document.getElementById("msg").style.display = "none";
      }, 5000);
   }else{
    let perssone = {
    nom:nom.value,
    prenom:prenom.value,
    telephone:tele.value,
    email:email.value,
    motif:motif.value,
    date:date.value,
   }

   perssones = loadFromLocal()

   perssones.push(perssone);
   saveToLocal(perssones)
   Close()
   nom.value = "";
   prenom.value ="";
   tele.value = "";
   email.value = ""
   motif.value = ""
   date.value =""

 
  setTimeout(() => {
    message.style.display = "block";
    message.classList.add("Verify1")
    message.textContent = "Demande ajoutée"
  }, 500);


  setTimeout(() => {
    document.getElementById("msg").style.display = "none";
  }, 3000);

   loadperssones()
   }
  
}

function loadperssones(){
   const table = document.getElementById("tableBody");
   table.innerHTML = "";
   let perssones = loadFromLocal();

   const start = (currentPage - 1) * rowsPerPage;
   const end = start + rowsPerPage;
   const paginatedData = perssones.slice(start, end);

   paginatedData.forEach((perssone, index) => {
      table.innerHTML += `<tr>
         <td>${perssone.nom} ${perssone.prenom}</td>
         <td>${perssone.telephone}</td>
         <td>${perssone.motif}</td>
         <td>${perssone.date}</td>
         <td>
            <button class="DeletBtn" onclick="Delet(${start + index})">Delet</button>
            <button class="ModiferBtn" onclick="ModiferModal(${start + index})">Modifer</button>
         </td>
      </tr>`;
   });


   const totalPages = Math.ceil(perssones.length / rowsPerPage);
   document.getElementById("prevBtn").disabled = currentPage === 1;
   document.getElementById("nextBtn").disabled = currentPage === totalPages || totalPages === 0;
   CountPg.value = currentPage;
}

function nextPage() {

    currentPage++;
    loadperssones();
}
function prevPage() {
    currentPage--;
    loadperssones();
}
loadperssones()
