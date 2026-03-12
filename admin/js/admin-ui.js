/* ============================================
   管理画面 共通UI
   ============================================ */

var AdminUI = (function () {
  'use strict';

  /* ------------------------------------------
     サイドバー: 現在ページのリンクをactive化
  ------------------------------------------ */
  function initSidebarActive() {
    var currentPage = location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.sidebar-nav__link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var linkPage = href.split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('is-active');
      }
    });
  }

  /* ------------------------------------------
     未対応お問い合わせバッジ更新
  ------------------------------------------ */
  function updateInquiryBadge() {
    var badge = document.getElementById('inquiryBadge');
    if (!badge || typeof AdminData === 'undefined') return;
    var stats = AdminData.getStats();
    if (stats.openCount > 0) {
      badge.textContent = stats.openCount;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  }

  /* ------------------------------------------
     トースト通知
  ------------------------------------------ */
  function showToast(message, type) {
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' toast--' + type : '');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3500);
  }

  /* ------------------------------------------
     確認ダイアログ
  ------------------------------------------ */
  function showConfirm(message, onConfirm) {
    var modal = document.getElementById('confirmModal');
    var msgEl = document.getElementById('confirmMessage');
    var okBtn = document.getElementById('confirmOk');
    var cancelBtn = document.getElementById('confirmCancel');

    if (!modal || !msgEl || !okBtn || !cancelBtn) return;

    msgEl.textContent = message;
    modal.classList.add('is-open');

    function cleanup() {
      modal.classList.remove('is-open');
      okBtn.removeEventListener('click', handleOk);
      cancelBtn.removeEventListener('click', handleCancel);
    }

    function handleOk() {
      cleanup();
      onConfirm();
    }

    function handleCancel() {
      cleanup();
    }

    okBtn.addEventListener('click', handleOk);
    cancelBtn.addEventListener('click', handleCancel);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) handleCancel();
    }, { once: true });
  }

  /* ------------------------------------------
     ログアウトボタン
  ------------------------------------------ */
  function initLogout() {
    var btn = document.getElementById('logoutBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (typeof AdminAuth !== 'undefined') {
        AdminAuth.logout();
      }
    });
  }

  /* ------------------------------------------
     フェードイン
  ------------------------------------------ */
  function initFadeIn() {
    var els = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      els.forEach(function (el) { observer.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ------------------------------------------
     初期化
  ------------------------------------------ */
  function init() {
    initSidebarActive();
    updateInquiryBadge();
    initLogout();
    initFadeIn();
  }

  return {
    init: init,
    showToast: showToast,
    showConfirm: showConfirm,
    updateInquiryBadge: updateInquiryBadge
  };
}());
