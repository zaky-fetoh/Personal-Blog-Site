const blogModel = require("../model/blogs");


exports.addBlog = async (req, res, next) => {
    /***************
     * This method is usedto add a blog to model
     * Route: /blog ======= METHOD: POST
     * Input: {title, blog}, and Auth Jwt Ath Header
     * Retun: {ok, message, blogId}
     **************/
    const blogDoc = new blogModel({
        owner: req.user_id,
        title: req.body.title,
        blog: req.body.blog,
    });
    try {
        await (blogDoc.save());
        res.status(200).json({
            ok: true, message: "Blog Is Added",
            servTim: req.getReqTime(),
            blogId: blogDoc._id,
        })
    } catch (e) {
        res.status(500).json({
            servTim: req.getReqTime(),
            ok: false, message: e.message,
        })
    }
}


exports.getBlog = async (req, res, next) => {
    /**This methodis usedto retrive a bolg with 
     * agiven Id such as (req.params.id)
     * Route: /blog/:id METHOD: GET
     * INPUT: params.id
     * return {bloGtitle, bloGBody, BloGOwnerName}
     ***************/

    try {
        const DocBlog = await blogModel.findOne({
            _id: req.params.id,
        }, { __v: 0 })
        res.status(200).json({
            ok: true, message: "Sucess",
            servTim: req.getReqTime(),
            data: DocBlog,
        })
    } catch (e) {
        res.status(200).json({
            ok: true, message: e.message,
            servTim: req.getReqTime(),
            data: DocBlog,
        })
    }

}


exports.getMyBlogs = async (req, res, next) => {
    /**
     * Route : blog/my-blog --- Method: GET
     * input : req.user_id
     * resp  : [{Blogs}]
     * this method provide the array list 
     * ofUser blog given His authentication
     */
    try {
        const blogDocs = await blogModel.find({
            owner: req.user_id,
        }, { __v: 0 });
        res.status(200).json({
            ok: true, message: "Sucess",
            servTim: req.getReqTime(),
            data: blogDocs,
        })
    } catch (e) {
        res.status(500).json({
            ok: false, message: e.meassage,
            servTim: req.getReqTime(),
        })
    }
}

exports.getAllBlogsHeaders = async (req, res, next) => {
    /*****
     * Route: /blog   -----  METHOD: GET
     * Input: Request all titlES of all blogs
     * respo: [{blog_id, blog_title, blog_time, blog_owner}]
     */
    try {
        const blogsDoc = await blogModel.find({
        }, { __v: 0, blog: 0 });
        res.status(200).json({
            ok: false, message: "Success",
            servTim: req.getReqTime(),
            data: blogsDoc.map(e => ({
                blog_id: e._id, blog_title: e.title,
                blog_time: e.time, blog_owner: e.owner,
            })),
        })
    } catch (e) {
        res.status(500).josn({
            servTim: req.getReqTime(),
            ok: false, message: e.message,
        })
    }
}


exports.deleteBlog = async (req, res, next) => {
    /*****
     * Route: /blog/id  Method: DELETE
     * input: user_id from the Auth Token
     *        params.id from the URl
     * retur: {ok, message}
     * This method delete a given params.id Blog and 
     * delete a blog iff the user is the owner ofthis blog
     */
    try {
        const dltResult = await blogModel.deleteOne({
            _id: req.params.id, owner: req.user_id
        });
        res.status(200).json({
            ok: true,
            message: `${dltResult.deletedCount} Blog Deleted`,
        })
    } catch (e) {
        res.status(500).json({
            ok: false, message: e.message,
        })
    }
}
