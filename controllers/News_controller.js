const News = require("../models/News_model");

//Simple version, without validation or sanitation

exports.news_create = function (req, res, next) {
  let news = new News({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    featured: req.body.featured,
    breakingNews: req.body.breakingNews,
    desc: req.body.desc,
    thumbnail: req.body.thumbnail,
  });

  news.save(function (err) {
    if (err) {
      return next(err);
    }

    res.render("news/add", {
      viewTitle: "Thêm tin tức",
    });
  });
};

exports.news_details = function (req, res) {
  News.findById(req.params.id, function (err, news) {
    if (err) return res.json({ err });
    res.json({ success: true, news });
  });
};

exports.news_update = function (req, res) {
  News.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, news) {
      if (err) return next(err);
      res.send("News udpated.");
    }
  );
};

exports.news_delete = function (req, res) {
  News.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

exports.getAllNews = function (req, res) {
  const col = "_id title content category featured desc thumbnail video ";
  News.find({}, col, { sort: { _id: 1 } }, (err, news) => {
    if (err) {
      return res.json({ err });
    }
    res.json({ success: true, news: news.sort((a, b) => b._id + a._id) });
  });
};

exports.getNewsByCategory = function (req, res) {
  const { category, qty } = req.params;
  News.find({ category }, function (err, news) {
    if (err) return res.json(err);
    if (qty) {
      return res.json({ success: true, news: [...news].splice(0, qty) });
    }
    res.json({ success: true, news });
  });
};

exports.searchPosts = function (req, res) {
  const { query } = req.params;
  News.find({}, null, { sort: { _id: -1 } }, function (err, news) {
    if (news) {
      const data = news.filter((news) =>
        news.title.toLowerCase().includes(query.trim().toLowerCase())
      );
      res.json({ success: true, news: data });
    }
    if (err) return res.json(err);
  });
};
