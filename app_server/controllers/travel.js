// get the travel view
const index = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
};

module.exports = {
    index
};