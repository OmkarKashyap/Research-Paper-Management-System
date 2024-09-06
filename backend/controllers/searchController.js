const Paper = require('../models/paper');
const llmService = require('../services/llmService');

exports.search = async (req, res) => {
  const { query } = req.body;
  const papers = await Paper.search(query);
  const enhancedResults = await llmService.enhanceResults(papers, query);
  res.json(enhancedResults);
};
