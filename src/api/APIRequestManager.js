export default class APIRequestManager {
  static log = false;
  static count = 1;

  static addLog(request, response, error = false) {
    if (this.log) {
      let print = error ? console.error : console.log;

      print(`${this.count}.`, request.method, request.url, request.params);
      print(`${this.count}.`, response);

      this.count += 1;
    }
  }

  static submit(request) {
    return new Promise((resolve, reject) => {
      fetch(request.url, {
        method: request.method,
        cache: request.cacheType,
        keepalive: request.keepAlive,
        headers: {
          "Content-Type": request.contentType,
        },
        body: JSON.stringify(request.params),
      })
        .then((response) => response.json())
        .then((data) => {
          this.addLog(request, data);
          resolve(data);
        })
        .catch((error) => {
          this.addLog(request, error, true);
          reject(error);
        });
    });
  }
}
