module.exports = {
  gcspost(req,res){
    console.log(req.file)
      res.status(200).json({
          message : "Your File Succes To uploads",
          link : req.file
      })
  }
}