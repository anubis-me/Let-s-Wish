
var wish = require('../models/wisher'); // Import User Model


module.exports = function (router) {

    router.post('/wisher', function(req,res) {
        var wishing      = new wish();
        wishing.messages = req.body.messages;
        wishing.choice   = req.body.choice;
        wishing.counter  = req.body.counter;
        wishing.views    = req.body.views;
        wishing.fest     = req.body.fest;
        wishing.uname    = req.body.uname;

        if (req.body.messages === null || req.body.messages === '' || req.body.views === null || req.body.views === 0 || req.body.choice === null || req.body.choice === '' || req.body.counter === 0 || req.body.counter === null || req.body.fest === '' || req.body.fest === null|| req.body.uname === '' || req.body.uname === null )
        {
            res.json({success: false, message: 'Ensure all the details were provided'});
        }
        else
        {
            wishing.save(function(err) {
                if (err) {
                    res.json({success: false, message: err}); // Display any other error
                }
                else {
                    res.json({success: true,     messages:wishing.messages, views:wishing.views, choice:wishing.choice, fest:wishing.fest, counter:wishing.counter}); // Send success message back to controller/request
                }
            });
        }
    });
    //input counter onl
    router.put('/inc_views', function (req,res) {
        wish.findOne({counter: req.body.counter}).select('counter views ').exec(function (err,wishing) {
            if(err){
                res.json({success:false,message:err});
            }
            else{
                if(req.body.counter === '' || req.body.counter === null){
                    res.json({success:false, message:"Counter Id was not provided"});
                }
                else{
                    wishing.views = req.body.views ;
                    wishing.save(function (err) {
                        if(err){
                            res.json({success:false, message:err});
                        }
                        else{
                            res.json({success:true, message:"No of views updated" });
                        }
                    });
                }
            }
        });
    });
    //For getting message
    router.post('/message',function (req,res) {
        wish.findOne({counter:req.body.counter}).select('counter views fest uname messages').exec(function (err,wishing) {
            if(err){
                res.json({success:false, message:err});
            }
            else {
                if(!wishing){
                    res.json({success:false});
                }
                else{
                    wishing.views = parseInt(wishing.views,10)+1;
                    wishing.save();
                    res.json({success: true, messages:wishing.messages,uname:wishing.uname, views:wishing.views, fest:wishing.fest, counter:wishing.counter });
                }
            }
        });
    });



    return router; // Return the router object to the server
};