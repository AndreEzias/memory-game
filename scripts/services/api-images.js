
import ApiBase from './api-base.js';

class ApiImages extends ApiBase {

  constructor() {
    super();
    this.baseUrl = 'https://api.pexels.com/v1/';
    this.apiToken = '0Tzb1yd31IIFLOdrW10r8lOtp5BrNydKYqa00EOarAd2Y9zLsH8IiaXa'
    this.setHeaders({
        'Authorization': this.apiToken,
        'Content-Type': 'application/json'
    })
  }

  getImages(query = 'peoples', per_page) {
    return this.get(`search?query=${query}&per_page=${per_page}`);
  }

  getImage(id) {
    return this.get(`images/${id}`);
  }
}

export default new ApiImages();