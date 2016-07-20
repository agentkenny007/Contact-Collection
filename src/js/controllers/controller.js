import _ from 'lodash';
import Contact from '../models/contact';

export default class Controller {
    constructor(objects){
        this.type = 'Application: Contact List';
        objects = objects || {};
        this.interface = objects.document;
        this.list = objects.contactList;
        this.ajax = objects.ajax;
    }

    init(){
        this.ajax.then(data => this.createDummyData(data))
        this.interface
            // .on('click', '', function(){  })
            .on('submit', '.add-contact', e => this.submit(e));
    }

    addContact(options){
        options = options || {};
        let contact = new Contact(options),
            html = this.createHTML(contact);
        this.list.contacts.push(contact); // update model
        this.interface.find('main').append(html); // update view
        console.log(this.list);
    }

    createDummyData(Data){
        let data = Data.results,
            face = this.interface;
        data.forEach(person => {
            let options = {
                    firstName: person.name.first,
                    lastName: person.name.last,
                    homePhone: person.phone,
                    mobilePhone: person.cell,
                    email: person.email,
                    birthday: person.dob,
                    city: person.location.city,
                    state: person.location.state,
                    imageURL: person.picture.large
                };
            this.addContact(options);
        });
        console.log(data);
    }

    createHTML(contact){
        return `
            <section class="contact">
                <div class="avatar">
                    <img src="${contact.pic}">
                </div>
                <div class="info">
                    ${ contact.name.full ? `<span class="name">${contact.name.full}</span>` : '' }
                    ${ contact.location ? `<span class="location">${contact.location}</span>` : '' }
                    ${ contact.email ? `<span class="email">${contact.email}</span>` : '' }
                    ${ contact.number.home ? `<i class="fa fa-phone"></i><span class="home phone">${contact.number.home}</span>` : '' }
                    ${ contact.number.mobile ? `<i class="fa fa-mobile"></i><span class="mobile phone">${contact.number.mobile}</span>` : '' }
                    ${ contact.birthday ? `<span class="birthday">🎉🎈🎂 &nbsp;${contact.birthday}</span>` : '' }
                    ${ contact.blog ? `<span class="blog">${contact.blog}</span>` : '' }
                </div>
                <span class="close"></span>
            </section>
        `;
    }

    submit(event){
        event.preventDefault();
        let face = this.interface,
            options = {
                firstName: face.find('.first-name').val(),
                lastName: face.find('.last-name').val(),
                homePhone: face.find('.phone').val(),
                mobilePhone: face.find('.mobile').val(),
                email: face.find('.email').val(),
                url: face.find('.url').val(),
                birthday: face.find('.birthday').val(),
                city: face.find('.city').val(),
                state: face.find('.state').val(),
                imageURL: face.find('.image-url').val()
            };
        this.addContact(options);
    }
}
