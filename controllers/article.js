const articleModel = require('../models/article');
const userModel = require('../models/user');
module.exports = {createArticle, updateArticle, getArticle, deleteArticle};

async function createArticle(req, res, next) {
  const { body } = req;
  try{
    await userModel.findOne({ _id: body.owner });
    const  article = await articleModel.create(body);
    await userModel.updateOne(
        { _id: body.owner },
        { $inc: { numberOfArticles: 1 } }
      );
    return res.json(article);
  } catch(e){
    throw e;
  }

}

async function updateArticle(req, res, next){
    const { body, params } = req;
        try{
            await articleModel.findOne({ _id: params.id });
            await userModel.findOne({ _id: body.owner });
            
            const article = await articleModel.updateOne({_id: req.params.id}, req.body);
            res.json(article);
        } catch(e){
    throw e;
        }
    }

    async function getArticle(req, res, next){
        const { query } = req;
        try{
            const article = await articleModel.findOne(query).populate('owner');
            res.json(article);
        } catch(e){
    throw e;
        }
    }
    
    async function deleteArticle(req, res, next) {
          const { params } = req;
          try {
            const article = await articleModel.findOne({ _id: params.id });
            const deleteArt = await articleModel.deleteOne({ _id: params.id });
            await userModel.updateOne(
              { _id: article.owner },
              { $inc: { numberOfArticles: -1 } }
            );
            res.json(deleteArt);
          } catch(e){
            throw e;
                }
            }

    
