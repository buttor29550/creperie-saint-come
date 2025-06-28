// 🚩 src/services/emailService.js - Crêperie de Saint Côme

import emailjs from 'emailjs-com';

// Remplacez par vos informations EmailJS
const SERVICE_ID = 'VOTRE_SERVICE_ID';
const TEMPLATE_CONFIRM_ID = 'VOTRE_TEMPLATE_CONFIRM_ID';
const TEMPLATE_REFUSE_ID = 'VOTRE_TEMPLATE_REFUSE_ID';
const USER_ID = 'VOTRE_USER_ID';

export const sendConfirmationEmail = (toEmail, toName, date, heure, nombre) => {
    const templateParams = {
        to_email: toEmail,
        to_name: toName,
        date: date,
        heure: heure,
        nombre: nombre
    };

    return emailjs.send(SERVICE_ID, TEMPLATE_CONFIRM_ID, templateParams, USER_ID);
};

export const sendRefusalEmail = (toEmail, toName, motif) => {
    const templateParams = {
        to_email: toEmail,
        to_name: toName,
        motif: motif
    };

    return emailjs.send(SERVICE_ID, TEMPLATE_REFUSE_ID, templateParams, USER_ID);
};
