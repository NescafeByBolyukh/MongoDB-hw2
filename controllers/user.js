const userModel = require('../models/user');
const articleModel = require('../models/article');
module.exports = {createUser, updateUser, getUserById, deleteUser, getArticlesByUserId};

async function createUser(req, res, next) {
  const { body } = req;
  try{
    const  user = await userModel.create(body);
    return res.json(user);
  } catch(e){
    throw e;
  }

}

async function updateUser(req, res, next){
      try{
          const user = await userModel.updateOne({_id: req.params.id}, req.body);
          res.json(user);
      } catch(e){
  throw e;
      }
  }

  async function getUserById(req, res, next){
        try{
            const user = await userModel.findOne({_id: req.params.id});
            res.json(user);
        } catch(e){
    throw e;
        }
    }
    
    async function deleteUser(req, res, next) {
    const { params } = req;
    try {
      const deleteInfo = await userModel.deleteOne({ _id: params.id });
      res.json(deleteInfo);
    } catch(e){
      throw e;
          }
      }
    async function getArticlesByUserId(req, res, next) {
      try {
        await userModel.find({ _id: req.params.id });
        const articles = await articleModel.find({ owner: req.params.id });
        res.json(articles);
      } catch(e){
        throw e;
            }
        }