var modalMapLink = document.querySelector('.modal-map-link');
var modalMap = document.querySelector('.modal-map');
var modalMapClose = modalMap.querySelector('.button-close');

var modalFeedbackLink = document.querySelector('.modal-feedback-link');
var modalFeedback = document.querySelector('.modal-feedback');
var modalFeedbackClose = modalFeedback.querySelector('.button-close');
var feedbackName = modalFeedback.querySelector('.feedback-field-name');
var feedbackEmail = modalFeedback.querySelector('.feedback-field-email');
var feedbackMessage = modalFeedback.querySelector('.feedback-field-message');
var feedbackForm = modalFeedback.querySelector('.feedback-form');

var sliderControlsList = document.querySelectorAll('.slider-control');
var promoSlidesList = document.querySelectorAll('.slide');

var tabControlsList = document.querySelectorAll('.service-tab');
var servicesList = document.querySelectorAll('.service');
var tabButtonList = document.querySelectorAll('.button-tab');

var isStorageSupport = true;
var storageName = '';
var storageEmail ='';

try {
  storageName = localStorage.getItem('name');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

//Modal-map
modalMapLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalMap.classList.add('open-modal');
});

modalMapClose.addEventListener('click', function() {
  modalMap.classList.remove('open-modal');
});

//Feedback-form
  modalFeedbackLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalFeedback.classList.add('open-modal');

  if (storageName && storageEmail) {
    feedbackName.value = storageName;
    feedbackEmail.value = storageEmail;
    feedbackMessage.focus();
  } else if (!storageName && !storageEmail) {
    feedbackName.focus();
  } else if (storageName && !storageEmail) {
    feedbackName.value = storageName;
    feedbackEmail.focus();
  } else {
    feedbackEmail = storageEmail;
    feedbackName.focus();
  }
});

modalFeedbackClose.addEventListener('click', function() {
  modalFeedback.classList.remove('open-modal');
  modalFeedback.classList.remove('error-modal');
});

feedbackForm.addEventListener('submit', function(evt) {
  if (feedbackName.value && feedbackEmail.value && feedbackMessage.value) {
    if (isStorageSupport) {
      localStorage.setItem('name', feedbackName.value);
      localStorage.setItem('email', feedbackEmail.value);
    }
  } else {
    evt.preventDefault();
    modalFeedback.classList.remove('error-modal');
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add('error-modal');
  }
});

//Modal closing with keydown
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains('open-modal')) {
      evt.preventDefault();
      modalFeedback.classList.remove('open-modal');
      modalFeedback.classList.remove('error-modal');
    }
    if (modalMap.classList.contains('open-modal')) {
      evt.preventDefault();
      modalMap.classList.remove('open-modal');
    }
  }
});

//Promo-slider
var addPromoSliderControlClickHandler = function(sliderControl, promoSlide) {
  sliderControl.addEventListener('click', function() {
    for (var j = 0; j < sliderControlsList.length; j++) {
      sliderControlsList[j].classList.remove('current-control');
      promoSlidesList[j].classList.remove('current-slide');
    };

    sliderControl.classList.add('current-control');
    promoSlide.classList.add('current-slide');
  });
};

for (var i = 0; i < sliderControlsList.length; i++) {
  addPromoSliderControlClickHandler(sliderControlsList[i], promoSlidesList[i]);
}

//Services-slider
var addServiceControlClickHandler = function(tabControl, tabButton, service) {
  tabControl.addEventListener('click', function() {
    for (var j = 0; j < tabControlsList.length; j++) {
      tabControlsList[j].classList.remove('current-tab');
      servicesList[j].classList.remove('current-service');
      tabButtonList[j].removeAttribute('disabled');
    };

    tabControl.classList.add('current-tab');
    service.classList.add('current-service');
    tabButton.setAttribute('disabled', 'true');
  });
};

for (var i = 0; i < tabControlsList.length; i++) {
  addServiceControlClickHandler(tabControlsList[i], tabButtonList[i], servicesList[i]);
}


