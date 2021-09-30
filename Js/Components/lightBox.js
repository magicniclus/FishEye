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

        lightboxHTML.style.display = 'none';

        //Récuperation des liens 
        const previewImg = lightboxHTML.querySelector('img');
        const linksLight = document.querySelectorAll(".photographerImg");

        for (let i = 0; i < linksLight.length; i++) {
            linksLight[i].addEventListener('click', function (e) {

                let newIndex = i;
                e.preventDefault();
                function preview() {
                    const selectedImgUrl = linksLight[newIndex].querySelector('img').src;
                    previewImg.src = selectedImgUrl;
                }

                const prevBtn = lightboxHTML.querySelector('.lightbox__prev');
                const nextBtn = lightboxHTML.querySelector('.lightbox__next');

                // if (newIndex == 0) {
                //     prevBtn.style.display = 'none';
                // }else{
                //     prevBtn.style.display = 'block';
                // }

                // if (newIndex >= linksLight.length - 1) {
                //     nextBtn.style.display = 'none';
                // }else{
                //     nextBtn.style.display = 'block';
                // }

                prevBtn.addEventListener('click', function () {
                    newIndex--;
                    if (newIndex == 0) {
                        preview();
                        prevBtn.style.display = 'none';
                    } else {
                        preview();
                        prevBtn.style.display = 'block';
                    }
                })

                nextBtn.addEventListener('click', function () {
                    newIndex++;
                    if (newIndex >= linksLight.length - 1) {
                        preview();
                        nextBtn.style.display = 'none';
                    } else {
                        preview();
                        nextBtn.style.display = 'block';
                    }
                })

                preview();

                lightboxHTML.classList.add('lightbox');
                lightboxHTML.style.display = 'block';
            })


        }



        const closeBox = lightboxHTML.querySelector('.lightbox__close .fas');
        const prevBtnUn = lightboxHTML.querySelector('.lightbox__prev');
        const nextBtnUn = lightboxHTML.querySelector('.lightbox__next');
        closeBox.addEventListener("click", function () {
            lightboxHTML.classList.remove('lightbox');
            lightboxHTML.style.display = 'none';
            prevBtnUn.style.display = 'block';
            nextBtnUn.style.display = 'block';

        });

        this.DOM.appendChild(lightboxHTML);
    }

}



