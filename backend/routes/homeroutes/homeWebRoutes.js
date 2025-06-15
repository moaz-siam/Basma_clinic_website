const express = require('express');
const { getService, getDoctors, getDoctor, getresources, getArticle, getVideo, getGuide, getSearch } = require('../../controller/homecontroller/homeWebController');
const HomeRouterWeb = express.Router();


HomeRouterWeb.get('/services/:service' , getService)
HomeRouterWeb.get('/doctors' , getDoctors)
HomeRouterWeb.get('/doctors/:doctorname' , getDoctor)
HomeRouterWeb.get('/resources' , getresources)
HomeRouterWeb.get('/getarticle/:articleid' , getArticle)
HomeRouterWeb.get('/getvideo/:videoid' , getVideo)
HomeRouterWeb.get('/getmedicalguide/:guideid' , getGuide)
HomeRouterWeb.get('/search' , getSearch)






module.exports = HomeRouterWeb;