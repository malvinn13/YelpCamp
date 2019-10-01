var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
    {
        name: "Cloud's Rest", 
        description: "bla bla bla",
        image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP"
    },
    {
        name: "Desert Mesa", 
        description: "bla bla bla",
        image: "https://www.visitlakegeorge.com/sites/default/files/styles/1600x1000/public/2017-04/Private-Camp.jpg?itok=T8J11wXU"
    },
    {
        name: "Roger's Hill", 
        description: "bla bla bla",
        image: "https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg"
    },
    {
        name: "White Snow", 
        description: "bla bla bla",
        image: "https://cincinnatiusa.com/sites/default/files/styles/article_full/public/attractionphotos/Winton%20Woods%20Campground.JPG?itok=xqTUl4YJ"
    }
];

async function seedDB(){
    try {
        await Campground.deleteMany({});
        await Comment.deleteMany({});
        data.forEach(async (seed) => {
            const data = await Campground.create(seed);
            await data.comments.push(await Comment.create({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat magna vel bibendum auctor. Morbi ac vehicula tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis dui vel vestibulum aliquam. Sed vel lacinia massa, sed lobortis eros. Etiam id efficitur ante. Proin orci tellus, eleifend in bibendum quis, mattis non sapien. Fusce malesuada eu erat vel viverra. Maecenas egestas varius suscipit. Nam id est consequat, laoreet felis sit amet, varius erat. Donec orci nulla, rutrum a varius sit amet, blandit facilisis nunc. Morbi consectetur auctor nisl in hendrerit.",
                author: "Author #1"
            }));
            await data.comments.push(await Comment.create({
                text: "Praesent a erat tincidunt, accumsan sem at, elementum ante. Nam eu auctor nisi, eu bibendum ipsum. Nullam dictum sagittis lacinia. Quisque in nisl quis mi mattis dictum. Nulla aliquet fringilla est, eget accumsan sem cursus quis. In ante erat, ornare in sollicitudin id, cursus in ligula. Cras ultrices malesuada neque ut vulputate. Donec aliquet ante id vehicula imperdiet. Vestibulum malesuada elit vel erat auctor, non bibendum sem laoreet. Vivamus consectetur posuere euismod. Vivamus accumsan blandit est quis imperdiet. Sed congue nibh vel scelerisque convallis. Mauris commodo blandit pellentesque. Duis ac leo egestas, pretium nisi eget, dictum lorem. Phasellus a hendrerit nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                author: "Johnny"
            }));
            await data.save();
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;
