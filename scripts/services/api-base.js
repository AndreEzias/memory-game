
// make a class for the api base service that will be used to make all api calls
class ApiBase {
  constructor() {
    this.baseUrl = '';
    this.headers = [];
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setHeaders(headers) {
    this.headers = headers;
    }
  // make a get request to the api
  async get(url) {
    const res = await fetch(this.baseUrl + url, {
            method: 'GET',
            headers: this.headers
    });
      return await res.json();
  }
  // make a post request to the api
  async post(url, body) {
    const res = await fetch(this.baseUrl + url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });
      return await res.json();
  }
  // make a put request to the api
  async put(url, body) {
    const res = await fetch(this.baseUrl + url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });
      return await res.json();
  }
  // make a delete request to the api
  async delete(url) {
    const res = await fetch(this.baseUrl + url, {
          method: 'DELETE'
      });
      return await res.json();
  }
}

export default ApiBase;