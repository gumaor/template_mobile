import axios from 'axios'

global.ajax = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: common.API_URL + url,
        method: 'get',
        params: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Token': store.get('token') || ''
        }
      }).then((res) => {
        if (res.data.code == 100403) {
          common.jumpAuth();
        } else if (res.data.code == 404) {
          common.hideLoading();
          common.alert('系统似乎出了点问题～');
          return reject(res.data);
        } else {
          return resolve(res.data);
        }
      });
    }).catch((err)=>{
      return err;
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: common.API_URL + url,
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Token': store.get('token') || ''
        }
      }).then((res) => {
        if (res.data.code == 100403) {
          common.jumpAuth();
        } else if (res.data.code == 404) {
          common.hideLoading();
          common.alert('系统似乎出了点问题～');
          return reject(res.data);
        } else {
          return resolve(res.data);
        }
      });
    }).catch((err)=>{
      return err;
    });
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: common.API_URL + url,
        method: 'put',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Token': store.get('token') || ''
        }
      }).then((res) => {
        if (res.data.code == 100403) {
          common.jumpAuth();
        } else if (res.data.code == 404) {
          common.hideLoading();
          common.alert('系统似乎出了点问题～');
          return reject(res.data);
        } else {
          return resolve(res.data);
        }
      });
    }).catch((err)=>{
      return err;
    });
  },
  delete(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: common.API_URL + url,
        method: 'delete',
        params: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Token': store.get('token') || ''
        }
      }).then((res) => {
        if (res.data.code == 100403) {
          common.jumpAuth();
        } else if (res.data.code == 404) {
          common.hideLoading();
          common.alert('系统似乎出了点问题～');
          return reject(res.data);
        } else {
          return resolve(res.data);
        }
      });
    }).catch((err)=>{
      return err;
    });
  },
  getAll(requests) {
    return new Promise((resolve, reject) => {
      const gets = requests.map(v => {
        return axios({
          url: common.API_URL + v.url,
          method: 'get',
          params: v.data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Token': store.get('token') || ''
          }
        });
      });
      axios.all(gets).then(axios.spread((...res) => {
        if (res.some(v => v.data.code == 100403)) {
          common.jumpAuth();
        } else if (res.some(v => v.data.code == 404)) {
          common.hideLoading();
          common.alert('系统似乎出了点问题～');
          return reject(res.map(v => v.data));
        } else {
          return resolve(res.map(v => v.data));
        }
      }));
    }).catch((err)=>{
      return err;
    });
  }
}
