//page de creation de formulaire

/**
 * Formulaire de contact
 */
class FormModal {

    /**
     * constructeur du formulaire permetant de selectionner l'emplacement voulu pour ce dernier 
     *
     * @param   {[String]}  domTarget  [domTarget description]
     *
     * @return  {innerHTML}  
     */    
    constructor (domTarget, name) {

        this.name = name;
        this.DOM = document.createElement('div');
        this.DOM.setAttribute('class', 'formulaire');

        this.DOM.innerHTML = `
        <form action="#" method="POST">
        <h2 class="contact">Contactez-moi <br> ${this.name}</h2>
        <div class="prenom inputid">
            <label for="name">Prénom</label>
            <input type="text" name="user_name" id="first-name">
        </div>
        <div class="prenom inputid">
            <label for="name">Nom</label>
            <input type="text" name="user_name" id="last-name">
        </div>
        <div class="prenom inputid">
            <label for="name">Email</label>
            <input type="text" name="email" id="email">
        </div>
        <div class="saisitext">
            <label for="text">Votre message</label>
            <textarea></textarea>
        </div>
        
        <div class="button">
            <button id="submit-btn" type="submit">Envoyer</button>
        </div>
        <i class="fas fa-times"></i>
        </form> 
        `



        domTarget.appendChild(this.DOM)


        /**
         * Mise en place de la lunchModal et de la closeModal
         *
         */
        const form = document.querySelector(".formulaire")

        form.style.display='none';



        /**
         * Création de la close modal au click 
         *
         */
         let launchBtn = document.querySelector('.button-div');
 
         launchBtn.addEventListener("click", function(){
             form.style.display='flex';
         })

        

        /**
         * Création de la close modal au click 
         *
         */

        
        let closeBtn = document.querySelector('.fa-times');

        closeBtn.addEventListener("click", function(){
            form.style.display='none';
        })




       /**
        * Validation des saisi de l'utilisateur 
        *
        */
        const firstName = document.querySelector('#first-name');
        const lastName  = document.querySelector('#last-name');
        const email     = document.querySelector('#email');
        const submitBtn = document.querySelector("#submit-btn");

        const rejexName = /^[a-zA-Z]{2}/;
        const rejexMail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;



         /**
         * vérification grace aux rejex du first-name
         *
         * @param   {string}  #first-name  [#first-name description]
         *
         * @return  {boolean}               [return description]
         */
        function validationName () {
            if (firstName.value == '' || rejexName.test(firstName.value.trim()) === false){
                return false
            } 
        }



         /**
         * vérification grace aux rejex du Last-name
         *
         * @param   {string}  #first-name  [#first-name description]
         *
         * @return  {boolean}               [return description]
         */
          function validationLastName () {
            if (lastName.value == '' || rejexName.test(lastName.value.trim()) === false){
                return false
            } 
        }



        /**
         * vérification grace aux rejex du Mail
         *
         * @param   {string}  #first-name  [#first-name description]
         *
         * @return  {boolean}               [return description]
         */
         function validationMail () {
            if (email.value == '' || rejexMail.test(email.value.trim()) === false){
                return false
            } 
        }



        form.addEventListener('submit', e => {
            e.preventDefault();

            if (validationName() == false){
                firstName.style.border = '2px solid red';
            } else firstName.style.border = '2px solid green';
            
            if (validationLastName() == false){
                lastName.style.border = '2px solid red';
            } else lastName.style.border = '2px solid green';
            
            if (validationMail() == false){
                email.style.border = '2px solid red';
            } else email.style.border = '2px solid green';
        })

        firstName.addEventListener('focus', e => {
            e.preventDefault();
            if (validationName() == false){
                firstName.style.border = '2px solid red';
            } else firstName.style.border = '2px solid green';
        })

        lastName.addEventListener('focus', e => {
            e.preventDefault();
            if (validationLastName() == false){
                lastName.style.border = '2px solid red';
            } else lastName.style.border = '2px solid green';
        })

        email.addEventListener('focus', e => {
            e.preventDefault();
            if (validationMail() == false){
                email.style.border = '2px solid red';
            } else email.style.border = '2px solid green';
        })
    }
}