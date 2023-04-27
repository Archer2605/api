const Blog = require('../models/blog')

getAll = async (req,res)=>{
    const searchKey = req.query.searchKey
    let category = req.query.category
    if(searchKey){

        try{
            let list_blog = []
            const blogs = await Blog.find()
            console.log(searchKey.toLowerCase())
            blogs.forEach((blog)=>{
                if(blog.title.toLowerCase().includes(searchKey.toLowerCase())){
                    list_blog.push(blog)
                }
            })
            res.status(200).json(list_blog)
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }else if(category){
        const result = await Blog.find()
        data = result.filter(blog=>blog.category.toLowerCase()==category.toLowerCase())
        res.status(200).json(data)
    }else{
        try{
            const blogList = await Blog.find().sort({ createdAt: -1 });
            res.status(200).json(blogList)
        }catch(error){
            res.json(500).json(error)
        }
    }
}

getDetail = async (req,res)=>{
    const id = req.params.id
    try{
        const blog = await Blog.findById(id)
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json('Loi server')
    }
}


create = async (req,res)=>{
    try{
        const blogNew = new Blog(req.body)
        const blogSaved = await blogNew.save()
        res.status(200).json(blogSaved)
    }catch(error){
        res.status(500).json('Loi server')
    }
}

update = async (req,res)=>{
    const id = req.params.id
    try{
        const blogExist = await Blog.findById(id)
        try{
            const blogUpdate = await Blog.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            res.status(200).json(blogUpdate)
        }catch(error){
            res.status(500).json('Loi server')
        }
    }catch(error){
        res.status(400).json('Blog not exist')
    }
}

deleteAll = async (req,res)=>{
    try{
        const deleteAll = await Blog.deleteMany()
        res.status(200).json('Delete success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

deleteOne = async (req,res)=>{
    try{
        const resultDelete = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json('Delete success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

//Comment 
//add_comment
addComment = async (req,res)=>{
    const id = req.params.id
    try{
        const comment = {
            username: req.body.username,
            content: req.body.content
        }
        const blog = await Blog.findById(id)
        blog.comment.push(comment)
        const result = await blog.save()
        res.status(200).json(result)
    }catch(error){
        console.log('Loi server')
    }
}
//delete comment 
deleteComment = async (req,res)=>{
    const id_blog = req.params.id //id blog
    const id_comment = req.query.id_comment
    try{
        const blog = await Blog.findById(id_blog)
        // const id_comment = req.body.id // id comment
        blog.comment =  blog.comment.filter(comment => comment._id != id_comment)
        const result = await blog.save()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json("Loi server")
    }
}

//update comment
updateComment = async (req,res)=>{
    const id = req.params.id
    try{
        const blog = await Blog.findById(id)
        const id_comment = req.body.id
        blog.comment =  blog.comment.map((comment)=>{
            if(comment._id == id_comment){
                comment.content = req.body.content
            }
            return comment
        })
        const result = await blog.save()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json('Loi server')
    }
}

//get comment 
getComment = async (req,res)=>{
    const blog_id = req.params.id
    const comment_id = req.query.id_comment
    try{
        const blog = await Blog.findById(blog_id)
        const comment_result = blog.comment.find(comment => comment._id == comment_id)
        res.status(200).json(comment_result)
    }catch(error){
        res.status(500).json('Loi server')
    }
}


module.exports = {
    getAll,
    getDetail,
    create,
    update,
    deleteAll,
    deleteOne,
    addComment,
    deleteComment,
    updateComment,
    getComment
}