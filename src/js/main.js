// External Libraries
import $ from 'jquery';
import _ from 'lodash';

// Internal Classes
import Controller from './controllers/controller';
import List from './models/list';
import Contact from './models/contact';

let list = new List,
    args = {
        ajax: $.ajax({
                dataType: 'json',
                url: 'https://randomuser.me/api/',
                data: {
                    inc: 'name, location, email, dob, phone, cell, picture',
                    nat: 'au, ca, fr, es, gb, ir, us',
                    results: 12,
                    seed: 'exact'
                } }),
        contactList: list,
        document: $(document)
    }, app = new Controller(args);

app.init();
