const form=document.querySelector("#film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

// UI Objesini Başlatma

const ui=new UI();

// Storage Objesi Üret
const storage=new Storage();

//Tüm eventleri yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);

    document.addEventListener("DOMContentLoaded",function(){
    let films=storage.getFilmsFromStorage();
    ui.loadAllFilms(films); 
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title ==="" || director ===""|| url ===""){
        //Hata
        ui.displayMessage("Tüm Alanları Doldurun...","danger");//hata mesajı

    }
    else{
        //Yeni Film
        const newFilm=new Film(title,director,url);
        ui.addFilmToUI(newFilm); //Arayüze film Ekleme

        storage.addFilmToStorage(newFilm);// Storage Film Ekleme

        ui.displayMessage("Film Başarıyla eklendi","success")//başarı mesajı

    }
    ui.clearInput(titleElement,urlElement,directorElement);
     e.preventDefault();
}


function deleteFilm(e){
  if(e.target.id==="delete-film"){
      ui.deleteFilmFromUI(e.target);
      //previus bir önceki başlığı alır
      storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      ui.displayMessage("Silme İşlemi Başarılı","success")
  }
}


function clearAllFilms(){
    if(confirm("Emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMessage("Tüm Filmler Silindi...","warning")
    }
   
}