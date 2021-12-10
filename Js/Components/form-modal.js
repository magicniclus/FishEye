//page de creation de formulaire


/**
 * Formulaire de contact
 */
class FormModal {

    /**
     * constructeur du formulaire permetant de selectionner l'emplacement voulu pour ce dernier 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {HTMLElement}  name       [name description]
     *
     */   
    constructor (domTarget, name) {

        this.name = name;
        this.DOM = document.createElement('div');
        this.DOM.setAttribute('class', 'formulaire');

        this.DOM.innerHTML = `
        <form action="#" method="POST">
        <div class='topForm'>
            <h2 class="contact">Contactez-moi <br> ${this.name}</h2>
            <i class="fas fa-times closeIn" aria-label='fermer le formulaire'></i>
        </div>    
        <div class="prenom inputId">
            <label for="name">Prénom</label>
            <input type="text" name="user_name" id="first-name">
        </div>
        <div class="prenom inputId">
            <label for="name">Nom</label>
            <input type="text" name="user_name" id="last-name">
        </div>
        <div class="prenom inputId">
            <label for="name">Email</label>
            <input type="text" name="email" id="email">
        </div>
        <div class="saisitext inputId">
            <label for="text">Votre message</label>
            <textarea></textarea>
        </div>
        
        <div class="button">
            <button id="submit-btn" type="submit" aria-label='Envoyer le formulaire'>Envoyer</button>
        </div>
        </form> 
        `



        domTarget.appendChild(this.DOM)

        /**
         * @type {HTMLFormElement}
         */
        const form = document.querySelector(".formulaire");

        
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

        
        let closeBtn = document.querySelector('.closeIn');

        closeBtn.addEventListener("click", function(){
            form.style.display='none';
        })

        document.addEventListener('keyup', (key) => {
            if(key.key == 'Escape'){
                form.style.display ='none';
            }
        })




       /**
        * Validation des saisi de l'utilisateur 
        *
        */
       /**
        * @type {HTMLInputElement}
        */
        const firstName = document.querySelector('#first-name');

        /**
        * @type {HTMLInputElement}
        */
        const lastName  = document.querySelector('#last-name');

        /**
        * @type {HTMLInputElement}
        */
        const email     = document.querySelector('#email');

        /**
        * @type {HTMLInputElement}
        */
        const submitBtn = document.querySelector("#submit-btn");

        const rejexName = /^[a-zA-Z]{2}/;
        const rejexMail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;



         /**
         * vérification grace aux rejex du first-name
         *
         * @param   {string}  
         *
         * @return {boolean}               [return description]
         */
        function validationName () {
            if (firstName.value == '' || rejexName.test(firstName.value.trim()) === false){
                return false
            } 
            return true;
        }



         /**
         * vérification grace aux rejex du Last-name
         *
         *
         * @return  {boolean}               [return description]
         */
          function validationLastName () {
            if (lastName.value == '' || rejexName.test(lastName.value.trim()) === false){
                return false
            } 
            return true;
        }



        /**
         * vérification grace aux rejex du Mail
         *
         *
         * @return  {boolean}               [return description]
         */
         function validationMail () {
            if (email.value == '' || rejexMail.test(email.value.trim()) === false){
                return false
            } 
            return true;
        }


        /**
         * Verification de la valeur true ou false et application des modification du css en fonction et a chaque saisi 
         *
         * @param   {Event}  keyup  [keyup description]
         * @param   {Event}  e      [e description]
         *
         * @return  {Boolean}         [return description]
         */
        form.addEventListener('keyup', e => {
            e.preventDefault();

            if (validationName() == false){
                // @ts-ignore
                firstName.style.border = '2px solid red';
            // @ts-ignore
            } else firstName.style.border = '2px solid green';
            
            if (validationLastName() == false){
                // @ts-ignore
                lastName.style.border = '2px solid red';
            // @ts-ignore
            } else lastName.style.border = '2px solid green';
            
            if (validationMail() == false){
                // @ts-ignore
                email.style.border = '2px solid red';
            // @ts-ignore
            } else email.style.border = '2px solid green';
        })


        /**
         * Verification de la valeur true ou false et application des modification du css en fonction et a chaque envoi 
         *
         * @param   {Event}  submit  [submit description]
         * @param   {Event}  e       [e description]
         *
         * @return  {Boolean}          [return description]
         */
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validationName() == false){
                // @ts-ignore
                firstName.style.border = '2px solid red';
            } else {
                // @ts-ignore
                firstName.style.border = '2px solid green';
            } 
            
            if (validationLastName() == false){
                // @ts-ignore
                lastName.style.border = '2px solid red';
            } else {
                // @ts-ignore
                lastName.style.border = '2px solid green';
            }
            
            if (validationMail() == false){
                // @ts-ignore
                email.style.border = '2px solid red';
            } else {
                // @ts-ignore
                email.style.border = '2px solid green';
            }

            if (validationName() == true && validationLastName() == true && validationMail() == true){
                this.DOM.style.display = 'none';

                /**
                * @type {HTMLInputElement}
                */
                const inputFirst = document.querySelector('#first-name');

                /**
                * @type {HTMLInputElement}
                */
                const inputLast = document.querySelector('#last-name');

                /**
                * @type {HTMLInputElement}
                */
                const inputEmail = document.querySelector('#email');
                console.log('Nom: '+inputFirst.value);
                console.log('Prenom: '+inputLast.value);
                console.log('Email: '+inputEmail.value);
                alert('Merci')
            }    
        })
    }
}