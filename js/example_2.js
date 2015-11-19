var MessageModel = Backbone.Model.extend({
    defaults: {
        code: 0,
        message: 'text message'
    }
});

var MessageCollection = Backbone.Collection.extend({
    model: MessageModel,
    url: '../api/example_2.php'
});

var MessageListView = Backbone.View.extend({
    tagName: 'ul',
    render: function () {
        _.each(this.collection.models, function (msg) {
            $(this.el).append(new MessageListItemView({model: msg}).render().el);
        }, this);
        return this;
    }
});

var MessageListItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tpl-message-item').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});


var MessageRouter = Backbone.Router.extend({
    routes: {
        "": "displayMessage"
    },

    displayMessage: function () {
        //var msg1 = new MessageModel({code:'001', message: 'Registration ok'});
        //var msg2 = new MessageModel({code:'002', message: 'Registration failed'});
        //var msg3 = new MessageModel({code:'003', message: 'Login ok'});
        //var msg4 = new MessageModel({code:'004', message: 'Login failed'});
        //
        //var msgCollection = new MessageCollection([msg1, msg2, msg3, msg4]);
        var msgCollection = new MessageCollection();
        var msgListView = new MessageListView({collection: msgCollection});
        msgCollection.fetch({
            success: function () {
                $('#messageList').html(msgListView.render().el);
            }
        });
    }
});

var msgRouter = new MessageRouter;
Backbone.history.start();

