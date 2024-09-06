const axios = require('axios');

class LLMService {
  async enhanceResults(papers, query) {
    // Call PyTorch-based LLM API for additional insights
    const response = await axios.post('http://llm-service/analyze', { papers, query });
    return response.data;
  }
}

module.exports = new LLMService();
