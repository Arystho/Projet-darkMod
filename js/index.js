/**
 * This function allows you to initialize my functions
 */

function init() {
    darkmod()
    newsletter()
    inscription()
    validInsc()
}
init();

/**
 * Display the darkMod when you click on the button :
 * afficher le darkMod quand on clic sur le bouton 
 */

function darkmod() {
    const darkmod = document.querySelector("#darkmode");
    const body = document.querySelector("body")

    darkmod.addEventListener("click", (e) => {
        if (body.classList.contains("darkmondeon") == false) {
            body.classList.add("darkmondeon")
            const logos = document.querySelector("#logo");
            logos.src = "img/logo-blanc.png"
        } else {
            body.classList.remove("darkmondeon")
            const logos = document.querySelector("#logo");
            logos.src = "img/logo-noir.png"
        }
    });
}

/**
 * Make my button functional and receive a newsletter :
 * Rendre mon bouton fonctionnel et recevoir un newsletter
 * 
 */

function newsletter() {
    const newsLetters = document.querySelector("#newsletter");

    newsLetters.addEventListener("click", (e) => {

        //Modal which closes by slamming on the cross : "modale qui se ferme en claquant sur la croix "
        const newDiv = document.createElement("div");

        newDiv.innerHTML = `
        <i class="fa-solid fa-xmark xmark"></i>
        <input type="text" id="email" placeholder="Entrez votre email">
        <button class="link"> recevoir un newsletter </button>
        `;
        newDiv.classList.add("form-container");
        document.body.appendChild(newDiv);
        const icone = document.querySelector(".xmark");
        icone.addEventListener("click", (e) => {
            newDiv.remove();
        });


        //Make my "receive Newsletter" button functional : "Rendre mon bouton "Recevoir la newsletter" fonctionnel"
        const buttonLink = document.querySelector(".link");
        buttonLink.addEventListener("click", (e) => {
            const email = document.querySelector("#email")
            if (validateEmail(email.value)) {
                newDiv.remove();

                //Modal that changes when you enter an email, creat the élément : "modale qui change quand on rentre un email, creation d'un élément "
                const textEmail = document.createElement("div");

                textEmail.innerHTML = `
        <i class="fa-solid fa-xmark xmark"></i>
        <p>Félicitation pour votre inscription à la newsletter </p>
        `;
                textEmail.classList.add("form-container");
                document.body.appendChild(textEmail);
                const icone = document.querySelector(".xmark");
                icone.addEventListener("click", (e) => {
                    textEmail.remove();
                });
            } else {
                alert("Email invalide ! ");
            }
        });
    })
}

/**
 * E-mail validation
 * 
 * @param {String} email - Email 
 * @returns {Boolean} 
 */

function validateEmail(email) {
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mail.test(String(email).toLowerCase());
}

/**
 * Creation of the first contact form :
 * Creation du premier formulaire de contact 
 */

function inscription() {
    const contactInsc = document.querySelector("#contact-button");
    const dialogClick = document.createElement("dialog");

    dialogClick.innerHTML = `
        <i class="fa-solid fa-xmark xmarkclose"></i>
        <h2>Contactez-nous</h2>
        <div>
        <input id="fullname" type="text" placeholder="Votre nom et Prénom">
        <input id="numTel" type="text" placeholder="Votre numéro de téléphone">
        <input id="nameEnt" type="text" placeholder="Le nom de votre entreprise">
        <input id="addEmail" type="text" placeholder="Votre adresse mail">
        <label id="rensPerso" for="renseignement">Je veux des renseignements concernant l'accompagnement perso</label>
        <select id="renseignement" name="list" form="form">
            <option value="perso" > Je veux des renseignement concernant l'accompagnement perso </option>
            <option value="group" > Je veux des renseignement concernant l'accompagnement small group </option> 
            <option value="digital"> Je veux des renseignements concernant la formation digitale </option>
            <option value="coaching"> Je veux des renseignements concernant le coaching digital </option>
            <option value="autre"> J'ai une autre demande </option>
        </select>
        <textarea name="text" id="message"></textarea>
        <label>
            <input type="checkbox" placeholder="Votre nom et Prénom" required>
            <p>En soumettant ce formulaire, j'accepte que les information saisies soient transmise par mail à l'équipe de SkillFacile dans le but d'être recontacté concernant la demande effectuée. Je comprends que j'ai un droit de modification, d'àces et de suppression de mes informations personnelles.
        </label>
        <button class="clic">Envoyer la demande</button>
        </div>
        `;
    dialogClick.classList.add(".form-container");
    document.body.appendChild(dialogClick);

    //Click on the icon to close the form : "clic sur l'icone pour fermer le formulaire" 
    const icone = document.querySelector(".xmarkclose");
    icone.addEventListener("click", (e) => {
        dialogClick.close()
    })
    contactInsc.addEventListener("click", (e) => {
        // sélectionner la balise dialog
        dialogClick.showModal();
    });
}

/**
 * When you press the button the page changes : 
 * Quand on appuis sur le bouton le page change 
 */

function validInsc() {
    const buttonClick = document.querySelector(".clic");
    buttonClick.addEventListener("click", (e) => {
        // On essaie d'envoyer le formulaire
        let isValid = true;
        
        // On test chacun des champs
        const fullname = document.querySelector("#fullname");

        if (fullname.value.trim() === "" || fullname.value.trim().length <= 2) {
            // Ce n'est pas bon, on affiche un message d'erreur
            isValid = false;
            alert("Le nom et prénom doivent comporter plus de 2 caractères.");
        };

        const numTel = document.querySelector("#numTel");
        const phone = /^[0-9\s\+\-]+$/;
        if (numTel.value.trim() === "" || !phone.test(numTel.value.trim()) || numTel.value.trim().length < 10){
            isValid = false;
            alert("Le numéro de téléphone doit comporter au moins 10 chiffres et être valide.");
        }

        const nameEnt = document.querySelector("#nameEnt");
        if (nameEnt.value.trim() === "" || nameEnt.value.trim().length <= 2) {
            isValid = false;
            alert("Le nom de l'entreprise doit comporter plus de 2 caractères.");
        }

        const addEmail = document.querySelector("#addEmail");
        if(!validateEmail(addEmail.value.trim())){
            isValid = false;
            alert("l'adresse e-mail n'est pas valide.")
        }

        const rensPerso = document.querySelector("#rensPerso"); 
        if (rensPerso.value.trim() === "") {
            isValid = false;
            alert("Vous devez sélectionner un type de renseignement")
        }
        

        const msg = document.querySelector("#message");
        if (msg.value.trim() === "" || msg.value.trim().lenght < 2) {
            isValid = false;
            alert("Le message doit comprter au moins 2 caractères.")
        }

        const linkClick = document.querySelector(".link")
        linkClick.addEventListener("click", (e) => {
            linkClick.remove();
        });

        // En arrivant ici, on test si isValid est égal à true
        if (isValid === true) {
            dialogClick.innerHTML = `
                <i class="fa-solid fa-xmark xmark"></i>
                <h2>Contactez-nous</h2>
                <p>Votre message à bien été envoyé</p>
                `;
            const icone = dialogClick.querySelector(".xmarkclose");
            icone.addEventListener("click", (e) => {
                dialogClick.remove();
            });
        }
    });
}