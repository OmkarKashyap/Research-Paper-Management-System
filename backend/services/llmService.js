const { spawn } = require('child_process');
const path = require('path');

class LlmService {
  async searchSimilarPapers(query) {
    return new Promise((resolve, reject) => {
      const pythonPath = path.join(__dirname, '..', 'venv', 'Scripts', 'python');
      const scriptPath = path.join(__dirname, '..', 'models', 'llm_model.py');
      
      const pythonProcess = spawn(pythonPath, [scriptPath, query]);

      let result = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}`));
        } else {
          resolve(JSON.parse(result));
        }
      });
    });
  }
}

module.exports = new LlmService();