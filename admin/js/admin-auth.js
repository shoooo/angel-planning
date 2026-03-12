/* ============================================
   管理画面 認証ガード
   ============================================ */

var AdminAuth = (function () {
  'use strict';

  var SESSION_KEY = 'ap_admin_session';
  var CREDENTIALS = { username: 'admin', password: 'angel2024' };

  return {
    login: function (username, password) {
      if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        sessionStorage.setItem(SESSION_KEY, '1');
        return true;
      }
      return false;
    },

    logout: function () {
      sessionStorage.removeItem(SESSION_KEY);
      location.href = 'index.html';
    },

    isLoggedIn: function () {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    },

    guard: function () {
      if (!this.isLoggedIn()) {
        location.href = 'index.html';
      }
    }
  };
}());
