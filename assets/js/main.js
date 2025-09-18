const nav = document.querySelector(".navbar");
const section = document.querySelector(".sections ");


//change background fron transparent to black 
window.addEventListener("scroll", (e) => {
    if (window.scrollY > section.offsetTop) {
        nav.classList.add("bg-black");
        nav.classList.remove("bg-transparent");
    }
})
//add modal
const showmodal = () => {
    const content_modal = document.querySelector('.modal-overlay');
    const images = Array.from(document.querySelectorAll('.product-image'));
    const left_arrow = document.querySelector('.fa-arrow-left');
    const right_arrow = document.querySelector('.fa-arrow-right');
    const modal_image = document.querySelector('.modal_img');
    const close_btn = document.querySelector('.fa-xmark');
    let curr = 0;
    let modalflag = false;
    images.forEach( (img) => {
        img.addEventListener("click",(e)=>{
        showemod();
        modalflag = true;
        curr = images.indexOf(e.target);
        console.log(curr);
        modal_image.setAttribute('src', e.target.getAttribute('src'));
        modal_image.classList.add('w-50');
        })
    })


    const showemod = () => {
        content_modal.classList.add("show");
        modalflag = true;

    }
    const hidemodal = () => {
        content_modal.classList.remove("show");
        modalflag = false;

    }
    const nextimg = () => {
        curr++;
        if (curr >= images.length)
            curr = 0;
        modal_image.setAttribute('src', images[curr].getAttribute('src'));
    }
    const previosimage = () => {
        curr--;
        if (curr < 0) {
            curr = images.length - 1;
        }

        modal_image.setAttribute('src', images[curr].getAttribute('src'));
    }
   
    document.addEventListener("keydown", ({ code }) => {
      
        if (code == 'ArrowRight') {
            previosimage();
        }
        if (code == 'ArrowLeft') {
            nextimg();
        }
        if (code == 'Escape') {
            hidemodal();
        }
    })
  
    document.addEventListener("click", (e) => {
        console.log(e);
        if (modalflag && e.target.classList.contains('modal-overlay')) {
            hidemodal();
        }
    })
    right_arrow.addEventListener("click", nextimg);
    left_arrow.addEventListener("click", previosimage);
    close_btn.addEventListener("click", hidemodal);
}
showmodal();