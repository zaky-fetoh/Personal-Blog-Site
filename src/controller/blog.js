const blogModel = require("../model/blogs");


exports.addBlog = async(req, res, next)=>{
    /***************
     * This method is usedto add a blog to model
     * Route: /blog ======= METHOD: POST
     * Input: {blogTitle, blogBody}, and Auth Jwt Ath Header
     * Retun: {ok, message, blogId}
     **************/
    const blogDoc = new blogModel({
        owner: req.user_id,
        title: req.body.blogTitle, 
        blog: req.body.blogBody,});
    try{await(blogDoc.save());
    res.status(200).json({
        servTim: req.getReqTime(),
        ok:true, message:"Blog Is Added",
        blogId: blogDoc._id,
    })}catch(e){
    res.status(500).json({
        servTim: req.getReqTime(),
        ok:false, message: e.message,
    })
}}


exports.getBlog = async(req, res, next)=>{
    /**This methodis usedto retrive a bolg with 
     * agiven Id such as (req.params.id)
     * Route: /blog/:id METHOD: GET
     * INPUT: params.id
     * return {bloGtitle, bloGBody, BloGOwnerName}
     ***************/
    
    try{
    const DocBlog = await blogModel.findOne({
        _id: req.params.id,
    },{__v:0})
    req.status(200).json({
        ok:true, message: "Sucess",
        servTim: req.getReqTime(),
        data:DocBlog,
    })}catch(e){
    req.status(200).json({
        ok:true, message: e.message,
        servTim: req.getReqTime(),
        data:DocBlog,
    })}

}


exports.getMyBlogs=(req, res, next)=>{
    /********
     * Route : /blog --- Method: GET
     * input : req.user_id
     * resp  : [{Blogs}]
     * this method provide the array list 
     * ofUser blog given His authentication
     */
    
}