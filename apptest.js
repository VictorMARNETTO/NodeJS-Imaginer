const mongoose = require ('mongoose');
const Article = require('./database/models/Article');

mongoose.connect('mongodb://localhost:27017/blog-test');
 


Article.findByIdAndUpdate("5cc8395bbde51345cea6f7b5",
{ title: "Avenger EndGame" }, (error, post) => {
    console.log(error,post);

})


/*
Article.findById("5cc8395bbde51345cea6f7b5",(error, articles) => {
    console.log(error,articles);

} )
*/

/*
Article.find({

    intro: "Avis sur le film"

}, (error, articles) => {
    console.log(error, articles);
    
})
*/

/*
Article.create({
    title: "SpiderMan",
    intro: "Avis sur le film",
    content: "Critique sur le film SpiderMan",
}, (error, post) => {
    console.log(error,post);

}

)
*/