import BaseService from "./BaseService";

const ApiService = {
  fetchData(param) {
    return new Promise((resolve, reject) => {
      BaseService(param)
        .then((response) => {
              resolve(response);
              console.log("Target Data from Api Service", response.data);
        })
        .catch((errors) => {
          // reject(errors);
        });
    });
  },
};

export default ApiService;
