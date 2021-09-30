class Lightbox {

    constructor(domTaget, props) {
        this.DOM = domTaget;
        this.props = props;
        this.render();
    }

    render() {
        this.showLightBox();
    }

    //Ajout de l'écouteur sur les liens 
    showLightBox() {

        const lightboxHTML = document.createElement('div');

        lightboxHTML.innerHTML = `
            <button class="lightbox__close"><i class="fas fa-times"></i></button>
            <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>
            <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>
            <div class="lightbox__container"><img src="" alt=""></div>
        `;

        lightboxHTML.style.display='none';

        //Récuperation des liens 
        const images = lightboxHTML.querySelector('.lightbox__container img, .lightbox__container video');
        const linksLight = document.querySelectorAll(".photographerImg a");
        for (let link of linksLight) {
            link.addEventListener("click", function (e) {

                //Désactivation des comportements par defaut des liens 
                e.preventDefault();

                lightboxHTML.style.display = 'block';

                images.src = this.href;
                console.log(images);

                //On affiche la modale
                lightboxHTML.classList.add('lightbox');
            })
        }

        const closeBox = lightboxHTML.querySelector('.lightbox__close .fas');

        closeBox.addEventListener("click", function () {
            lightboxHTML.classList.remove('lightbox');
            lightboxHTML.style.display='none';
        })



        this.DOM.appendChild(lightboxHTML);
    }

}



