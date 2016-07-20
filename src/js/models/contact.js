export default class Contact {
    constructor(options){
        let contact = this;
        options = options || {};
        contact.birthday = options.birthday;
        contact.blog = options.url
        contact.email = options.email;
        contact.location = options.city && options.state && options.state.length > 1 ?
        options.city + ', ' + options.state :
        options.city ? options.city :
        options.state && options.state.length > 1 ? options.state : null;
        contact.name = { first: options.firstName || null, last: options.lastName || null, full:
            options.firstName && options.lastName ? options.lastName + ', ' + options.firstName :
            options.firstName ? options.firstName : options.lastName ? options.lastName : null };
            contact.number = { home: options.homePhone, mobile: options.mobilePhone };
        contact.pic = options.imageURL || '../images/contact-icon.png';
        if (contact.location && contact.location.length < 5)
            contact.location = contact.location.substr(0,2).toUpperCase();
        if (contact.birthday){
            let bday = new Date(contact.birthday);
            contact.birthday = `${bday.getMonth() || '7'}/${bday.getDay() || '11'}/${bday.getFullYear()}`;
        }
    }
}
