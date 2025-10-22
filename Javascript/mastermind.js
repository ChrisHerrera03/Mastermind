
/* funzione per fare le righe della tabella */
var colori = [
    "gold", //giallo
    "tomato", // rosso 
    "skyblue", // azzurro
    "orange", //arancione 
    "teal", //verde #2ecc71
    "pink", //rosa #fd79a8
    "grey", // azzurro
    "plum", //viola #6c5ce7
    "black", //nero
    "brown"
];
var codiceSegreto = [], copiaCodiceSegreto = [],
    righe = 8, colonne = 4,
    tentativi, lvl = 'F',
    vittoria = false, sconfitta = false, accesso = false, ctrl = false,
    posizionePallinaInd = 0,
    posizioneRigaInd = 0, nomeUtente, nome, cognome,
    punteggioIniziale = 500, puntiDisponibili = 125, puntiPersi = 25, puntTot = punteggioIniziale, partiteVinte = 0, partitePerse = 0;

function creazioneTabella(r, nP) { // r = righe, nP = numero Palline / colonne
    var i, j, k;
    for (i = 0; i < nP; i++) { // impostare il numero di palline da inserire in ogni riga
        document.getElementById('combinazioneSegreta').innerHTML += "<div class = \"pallina\"><img src = \"..\\Immagini\\question.png\" class = \"puntoD\"></div>";
        document.getElementById('coloriScelti').innerHTML += "<div class = \"pallina\" onclick= \"colorarePallineDaIndovinare(this,"+ i +")\"></div>";
    }//<img src = \"..\\Immagini\\question.png\" class = \"puntoD\">
    for (i = 0; i < r; i++) {
        
        document.getElementById('sezionePalline').innerHTML += "<div class = \"riga nv\" ></div>";
        for (j = 0; j < nP; j++)
            document.getElementsByClassName('riga')[i].innerHTML += "<div class = \"pallina\"></div>";
        
        
        document.getElementsByClassName('riga')[i].innerHTML += "<div class = \"errori\"></div>";
        for (k = 0; k < nP; k++)
            document.getElementsByClassName('errori')[i].innerHTML += "<div class = \"sugg\"></div>";
        
    }
    
    tentativi = r -1;
    
    righe = r;
    colonne = nP;
    
    document.getElementById('tentativi').innerText = tentativi;
    
    pallineSegrete();
    
    coloraPallinePrincipali();
    
    document.getElementsByClassName('riga')[0].classList.remove('nv');
}

function coloraPallinePrincipali() {
    var i, j;
    for (i = 0; i < codiceSegreto.length; i++)
        copiaCodiceSegreto[i] = codiceSegreto[i];
    for (j = 0; j < colonne; j++) {
        i = Math.floor(Math.random() * copiaCodiceSegreto.length);       
        document.getElementById('coloriScelti').getElementsByClassName('pallina')[j].style.backgroundColor = copiaCodiceSegreto[i];
        copiaCodiceSegreto.splice(i, 1);
    }
}
function impostazioni(livello) {
    lvl = livello, i = 0;
    switch (lvl) {
        case 'F':
            reset();
            puntiDisponibili = 125;
            puntiPersi = 25;
            creazioneTabella(8, 4);
            for( i = 0; i < righe; i++)
                document.getElementsByClassName('errori')[i].style.margin = "11px 0 0 0";
            break;
        case 'M':
            reset();
            puntiDisponibili = 250;
            puntiPersi = 50;
            creazioneTabella(5, 4);
            for( i = 0; i < righe; i++)
                document.getElementsByClassName('errori')[i].style.margin = "11px 0 0 0";
            break;
        case 'D':
            reset();
            puntiDisponibili = 400;
            puntiPersi = 50;
            creazioneTabella(5, 6);
            for( i = 0; i < righe; i++)
                document.getElementsByClassName('errori')[i].style.margin = "0";
            break;
    }
    document.getElementById('pDisponibili').innerText = puntiDisponibili;
    document.getElementById('pPersi').innerText = puntiPersi;
    document.getElementById(lvl).checked = true;
}

function ApriChiudi(div) {
    if(document.getElementById(div).className == "non_visibile") {
        document.getElementById(div).classList.remove("non_visibile");
        document.getElementById(div).classList.add("visibile");
        document.getElementById(div).classList.add('slide-in-right');
    } else {
        document.getElementById(div).classList.remove("visibile");
        document.getElementById(div).classList.remove('slide-in-right');
        document.getElementById(div).classList.add("non_visibile");
    }
}

function reset(){
    document.getElementById('combinazioneSegreta').innerText = "";
    document.getElementById('coloriScelti').innerText = "";
    document.getElementById('sezionePalline').innerText = "";
    colori = ["gold", "tomato", "skyblue", "orange", "teal", "pink", "grey", "plum", "black", "brown"];
    posizionePallinaInd = 0;
    posizioneRigaInd = 0;
    vittoria = false;
    sconfitta = false;
    codiceSegreto.splice(0,codiceSegreto.length);
    
    /*for(var i = 0; i < codiceSegreto.length; i++)
        codiceSegreto[i] = "";
    */
    document.getElementById('vinto').classList.add('non_visibile');
    document.getElementById('perso').classList.add('non_visibile');
    document.getElementById('bottoneRiprovaAlternativo').classList.add('nv');
    document.getElementById('bottoneRiprovaAlternativo').classList.add('alternativi');
    document.getElementById('bottoneRiprovaAlternativo').classList.remove('cento');
    document.getElementById('bottoneProsegAlternativo').classList.add('nv');
}

function pallineSegrete() {
    var j, i;
    for (i = 0; i < colonne; i++) {
        j = Math.floor(Math.random() * (colori.length));
        codiceSegreto.push(colori[j]);
        colori.splice(j, 1);
        document.getElementById('combinazioneSegreta').getElementsByClassName('pallina')[i].style.backgroundColor = codiceSegreto[i];
    }
    
}
/* funzione per fare le righe della tabella */

function gioco() {
    creazioneTabella(righe, colonne);
    document.getElementsByClassName('riga')[0].classList.remove('nv');
}

function colorarePallineDaIndovinare(box,x) {
    //document.getElementById('sezionePalline').innerHTML += "<div class = \"riga\" id = \"r" + i + "\"></div>";
    if (!vittoria && accesso && puntTot > 0 && !sconfitta) {
        document.getElementById('coloriScelti').getElementsByClassName('pallina')[x].style.display = "none";
        document.getElementById('sezionePalline').getElementsByClassName('riga')[posizioneRigaInd].getElementsByClassName('pallina')[posizionePallinaInd].style.backgroundColor = box.style.backgroundColor;
        posizionePallinaInd++;
        if (posizionePallinaInd == colonne)
            if(!ctrl)
                document.getElementById('check').classList.remove('nv');
            else controllo();
    }
    if(!accesso)
        document.getElementById('avvioGioco').classList.remove('non_visibile');
    if(puntTot <= 0){
        punteggioIniziale = 500;
        document.getElementById('puntiTotali').innerText = punteggioIniziale;
        impostazioni('F');
    }
}
function controllo() {
    var indovinataPallina = 0, i;
    for( i = 0; i < colonne; i++){
        if(document.getElementById('sezionePalline').getElementsByClassName('riga')[posizioneRigaInd].getElementsByClassName('pallina')[i].style.backgroundColor == codiceSegreto[i])
            indovinataPallina++;
    }
    for(i = 0; i < indovinataPallina; i++)
        document.getElementById('sezionePalline').getElementsByClassName('riga')[posizioneRigaInd].getElementsByClassName('sugg')[i].style.backgroundColor = "#000";
    if(indovinataPallina == colonne){
        //VITTORIA
        vittoria = true;
        document.getElementById('vinto').classList.remove('non_visibile');
        document.getElementById('navbar').classList.remove('sconfitta');
        document.getElementById('navbar').classList.add('vittoria');
        document.getElementById('sottotitolo').classList.remove('sconfitta_sottotitolo');
        document.getElementById('sottotitolo').classList.add('vittoria_sottotitolo');
        document.getElementById('nU1').innerText = nomeUtente;
        puntTot += puntiDisponibili;
        document.getElementById('puntiTotali').innerText = puntTot;
        partiteVinte++;
        document.getElementById('partVinte').innerText = partiteVinte;
        document.getElementById('partTot').innerText = partitePerse + partiteVinte;
        for(i = 0; i < colonne; i++)                  
            document.getElementById('combinazioneSegreta').getElementsByClassName('pallina')[i].innerHTML  = "";
    } else {
        tentativi --;
        if(tentativi >= 0){
            posizioneRigaInd++;
            posizionePallinaInd = 0;
            document.getElementsByClassName('riga')[posizioneRigaInd].classList.remove('nv');
            document.getElementById('tentativi').innerText = tentativi;
        } 
        if (tentativi < 0){
            //SCONFITTA
            document.getElementById('perso').classList.remove('non_visibile');
            document.getElementById('navbar').classList.add('sconfitta');
            document.getElementById('navbar').classList.remove('vittoria');
            document.getElementById('sottotitolo').classList.add('sconfitta_sottotitolo');
            document.getElementById('sottotitolo').classList.remove('vittoria_sottotitolo');
            sconfitta = true;
            document.getElementById('nU2').innerText = nomeUtente;
            puntTot -= puntiPersi;
            document.getElementById('puntiTotali').innerText = puntTot;
            partitePerse++;
            document.getElementById('partPerse').innerText = partitePerse;
            document.getElementById('partTot').innerText = partitePerse + partiteVinte;
            for(i = 0; i < colonne; i++)
                document.getElementById('combinazioneSegreta').getElementsByClassName('pallina')[i].innerHTML  = "";
        }

    }
    comparireBottoni();
    if(!ctrl) document.getElementById('check').classList.add('nv');
}
function comparireBottoni(){
    for(var i = 0; i < colonne; i++){
        document.getElementById('coloriScelti').getElementsByClassName('pallina')[i].style.display = "inline-block";
    }
}

function accedi(){
    nomeUtente = document.getElementById('nU').value;
    nome = document.getElementById('ricevimentoNome').value;
    cognome = document.getElementById('ricevimentoCognome').value;
    if( nome == "") nome = "-";
    if(cognome == "") cognome = "-";
    if( nomeUtente == undefined || nomeUtente == "" ){
        document.getElementById('messaggioErrore').classList.add('scale-in-ver-center');
        document.getElementById('messaggioErrore').classList.remove('non_visibile');
    }else{
        document.getElementById('utente').innerHTML = "";
        document.getElementById('utente').innerHTML = "<p class = 'mexUtente' id = 'messaggioBenvenuto'> Benvenuto <span id = 'profiloGiocatore' onclick = 'profilo()'>"+ nomeUtente +"<span></p>";
        document.getElementById('utente').innerHTML += "<p class = 'mexUtente'> Punti iniziali disponibili:  "+ punteggioIniziale +" pti</p>";
        document.getElementById('utente').innerHTML += "<p class = 'mexUtente'> Punti acquisibili in questo livello: <span id = 'pDisponibili'>"+ puntiDisponibili +"</span> pti</p>";
        document.getElementById('utente').innerHTML += "<p class = 'mexUtente'> Punti perdibili in questo livello: <span id= 'pPersi'>" + puntiPersi + "</span> pti</p>";
        document.getElementById('utente').innerHTML += "<p class = 'mexUtente'> Score: <span id='puntiTotali'>"+ puntTot +"</span> pti</p>";
        document.getElementById('utente').style.width = "28.2%";
        accesso = true;
    }
}

function prosegui(stringa){
    document.getElementById(stringa).classList.add('non_visibile');
    switch(lvl){
        case 'F':
            lvl = 'M';
            impostazioni(lvl);
            break;
        case 'M':
            lvl = 'D';
            impostazioni(lvl);
            break;
        case 'D':
            lvl = 'F';
            impostazioni(lvl);
            break;
    }
    
}

function riprova(stringa){
    document.getElementById(stringa).classList.add('non_visibile');
    impostazioni(lvl);
}

function profilo(){
    ApriChiudi("profile");
    document.getElementById('partTot').innerText = partitePerse + partiteVinte;
    document.getElementById('partVinte').innerText = partiteVinte;
    document.getElementById('partPerse').innerText = partitePerse;
    document.getElementById('partPerse').innerText = partitePerse;
    document.getElementById('name').innerText = " " +nome;
    document.getElementById('surname').innerText = " " +cognome;
    document.getElementById('Username').innerText = " " +nomeUtente;
    
}

function mostraTentativi(stringa,x){
    ApriChiudi(stringa);
    switch(x){
        case 0:
            document.getElementById('bottoneRiprovaAlternativo').classList.remove('nv');
            document.getElementById('bottoneProsegAlternativo').classList.remove('nv');
            break;
        case 1:
            document.getElementById('bottoneRiprovaAlternativo').classList.remove('nv');
            document.getElementById('bottoneRiprovaAlternativo').classList.remove('alternativi');
            document.getElementById('bottoneRiprovaAlternativo').classList.add('cento');
            break;
    }
}
function attivareControllo(){
    if(document.getElementById('ctrl').checked){ 
        ctrl = true;
        document.getElementById('control').innerText = "Attivo";
    }
    else{
        ctrl = false;
        document.getElementById('control').innerText = "Disattivo";
    }
    
}
/*
function timer(){
    var minutes = 0;
    var seconds = 30;
    var x = setInterval(function() {
        if( seconds > 0 )
            seconds--;
        else{ seconds = 59;
             minutes--;
        }
        document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (minutes < 0) {
            clearInterval(x);
            sconfitta = true;
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}*/