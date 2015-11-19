var MessageModel = Backbone.Model.extend({
    urlRoot: '../api/example_1.php',
    defaults: {
        message: 'Text Message'
    }
});

var MessageView = Backbone.View.extend({
    template: _.template($('#tpl-hello-backbone').html()),
    render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var MessageRouter = Backbone.Router.extend({
    routes: {
        "": "displayMessage"
    },

    displayMessage: function(){
        var msg = new MessageModel();
        var msgView = new MessageView({model: msg});
        msg.fetch({
            success: function(){
                $('#msg').html(msgView.render().el);
            }
        });
    }
});

var msgRouter = new MessageRouter();
Backbone.history.start();