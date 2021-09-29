//getting all required elements
const gallery = document.querySelectorAll(".image"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    closeIcon = previewBox.querySelector(".icon"),
    currentImg = previewBox.querySelector(".current-img"),
    totalImg = previewBox.querySelector(".total-img"),
    shadow = document.querySelector(".shadow");
window.onload = () => {
    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length; //passer la longueur totale de l'img à la variable totalImg
        let newIndex = i; //passer la valeur i à la variable newIndex
        let clickedImgIndex; //création d'une nouvelle variable

        gallery[i].onclick = () => {
            clickedImgIndex = i; //passer l'index de l'image cliquée à la variable créée (clickedImgIndex)
            function preview() {
                currentImg.textContent = newIndex + 1; //passer l'index img actuel à la variable currentImg en ajoutant +1
                let imageURL = gallery[newIndex].querySelector("img").src; //obtenir l'utilisateur cliqué sur l'url img
                previewImg.src = imageURL; //l'utilisateur de passage a cliqué sur l'url img dans previewImg src
            }
            preview(); // appel de la fonction ci-dessus

            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if (newIndex == 0) { //si la valeur de l'index est égale à 0, masquer prevBtn
                prevBtn.style.display = "none";
            }
            if (newIndex >= gallery.length - 1) { //si la valeur de l'index est supérieure et égale à la longueur de la galerie de -1, masquez nextBtn
                nextBtn.style.display = "none";
            }
            prevBtn.onclick = () => {
                newIndex--; //decrementation index
                if (newIndex == 0) {
                    preview();
                    prevBtn.style.display = "none";
                } else {
                    preview();
                    nextBtn.style.display = "block";
                }
            }
            nextBtn.onclick = () => {
                newIndex++; //incrementation index
                if (newIndex >= gallery.length - 1) {
                    preview();
                    nextBtn.style.display = "none";
                } else {
                    preview();
                    prevBtn.style.display = "block";
                }
            }
            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show");
            shadow.style.display = "block";
            closeIcon.onclick = () => {
                newIndex = clickedImgIndex; //affectation de l'index img sur lequel l'utilisateur a cliqué en premier à newIndex
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
                document.querySelector("body").style.overflow = "scroll";
            }
        }

    }
}