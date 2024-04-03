// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const formSubmit = document.querySelector(".form");
formSubmit.addEventListener("submit", snackbarSubmit);

function snackbarSubmit (event) {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    const delay = formData.get('delay');
    const state = formData.get('state');
    
    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => {
          resolve(delay);
        }, delay);
      } else if (state === 'rejected') {
        setTimeout(() => {
          reject(delay);
        }, delay);
      }
    });
  
    promise
      .then((delay) => {
        iziToast.success({
            position: `topRight`,
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
     
      .catch((delay) => {
        iziToast.error({
            position: `topRight`,
          message: `❌ Rejected promise in ${delay}ms`,
        });
      });
      formSubmit.reset();
  }