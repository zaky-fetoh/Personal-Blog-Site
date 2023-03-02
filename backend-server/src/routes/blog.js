const contBlog = require("../controller/blog");



//this Route requires a gard it'll be addto in the index file
module.exports = require("express").Router()
        .post("/",contBlog.addBlog)
        .get("/", contBlog.getAllBlogsHeaders)
        .get("/my-blog", contBlog.getMyBlogs)
        .get("/:id", contBlog.getBlog)
        .delete("/:id",contBlog.deleteBlog)

