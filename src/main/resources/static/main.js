let billettArray = [];
let i=0;

function kjop() {
    //Inputfeltene
    const filmer = document.getElementById("filmer") // Gir et array av tilgjengelige filmer
    const filmInn = filmer.options[filmer.selectedIndex].value; //Henter valgt film
    const antallInn = document.getElementById("antall").value;
    const fornavnInn = document.getElementById("fornavn").value;
    const etternavnInn = document.getElementById("etternavn").value;
    const nrInn = document.getElementById("nr").value;
    const epostInn = document.getElementById("e-post").value;

    let inputVerdier = document.querySelectorAll("input");
    // Resetter hver inputfelt sin "output"-melding
    for (let verdi of inputVerdier) {
        document.getElementById(verdi.id + "-1").innerHTML = "";
    }
    document.getElementById("filmer-1").innerHTML = "";


    let feltFylt = true;

    // Sjekker om inputfeltene + dropdown er tomme, og om de er gyldige
    for (let verdi of inputVerdier) {
        let utFelt = document.getElementById(verdi.id + "-1") //Output felt
        let ut = ""
        if ((verdi.id == "antall" && verdi.value <= 0) || // Sjekker om antallet er mindre eller lik null
            verdi.id == "nr" && verdi.value.length == 8 // Sjekker om nummeret har en lengde på 8 siffer
            && verdi.value.match(/^[1-9]\d{7}/)) { //RegEx sjekker at nummeret ikke begynner på 0
            // og deretter etterfulgt av 7 sifre
            ut = "Skriv inn gyldig " + verdi.id;
            feltFylt = false;
        }
        if (verdi.value == "") { // Sjekker om inputfeltene er tomme
            ut = "<span> Må skrive noe i " + verdi.id + "</span>";
            feltFylt = false;
        }
        utFelt.innerHTML = ut; //Skriver melding ut om hva som må fikses
    }

    // Siden dropdown-listen for filmer er av en annen datatype enn de andre inputfeltene,
    // så skjer inputvalidering separert fra resten
    if (filmer.selectedIndex == 0) { // Sjekker om bruker har beholdt dropdown listen på standardalternativ
        document.getElementById("filmer-1").innerHTML = "<span>Må velge én film</span>";
        feltFylt = false;
    }

    // Kjøres hvis inputverdiene har bestått validering
    if (feltFylt) {
        // Verdiene samles inn i ett objekt og legges i et array
        billettArray[i] = {
            film : filmInn,
            antall : antallInn,
            navn : fornavnInn,
            etternavn : etternavnInn,
            tlf : nrInn,
            epost : epostInn
        }
        let ut = "";
        // Hvis det er aller første billett, legges til tittel på toppen
        if (i == 0) {
            ut = "<div><div>Film</div><div>Antall</div><div>Fornavn</div><div>Etternavn</div><div>Telefon</div><div>E-post</div></div>"
        }
        ut+= "<div><div>" + filmInn + "</div>"
            + "<div>" + antallInn + "</div>"
            + "<div>" + fornavnInn + "</div>"
            + "<div>" + etternavnInn + "</div>"
            + "<div>" + nrInn + "</div>"
            + "<div>" + epostInn + "</div>"
            + "</div>";
        document.getElementById("billetter").insertAdjacentHTML("beforeend", ut);
        i++;

        // Tømmer inputfeltene
        for (let verdi of inputVerdier) {
            verdi.value = "";
        }
        filmer.selectedIndex = 0;
    }

}

function slett() {
    document.getElementById("billetter").innerHTML = "";
    billettArray.splice(0, billettArray.length); //Sletter objektene i arrayet
    // Resetter i slik at objekter kan fremdeles legges inn i arrayet uten å laste inn siden på nytt
    i = 0;
}