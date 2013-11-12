/**
 * @file Add Spending
 * @author treelite(c.xinle@gmail.com)
 */
function AddAction() {}

AddAction.prototype.GET = function (query, finish) {
    finish('<h1>Add Action</h1><p>' + JSON.stringify(query) + '</p>');
};

module.exports = AddAction;
