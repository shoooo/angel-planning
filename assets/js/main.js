/* ============================================
   エンジェルプランニング - メインJS
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     ハンバーガーメニュー
  ------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------
     スクロールアニメーション
  ------------------------------------------ */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // IntersectionObserver 非対応の場合はすべて表示
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------
     現在ページのナビリンクをハイライト
  ------------------------------------------ */
  var currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  /* ------------------------------------------
     お問い合わせフォーム バリデーション
  ------------------------------------------ */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // 各フィールドをバリデート
      var rules = [
        { id: 'company', message: '会社名を入力してください' },
        { id: 'name', message: '担当者名を入力してください' },
        { id: 'tel', message: '電話番号を入力してください', pattern: /^[0-9\-\+\(\)\s]{7,20}$/, patternMsg: '正しい電話番号を入力してください' },
        { id: 'email', message: 'メールアドレスを入力してください', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMsg: '正しいメールアドレスを入力してください' },
        { id: 'message', message: 'お問い合わせ内容を入力してください' },
      ];

      rules.forEach(function (rule) {
        var field = document.getElementById(rule.id);
        var errorEl = document.getElementById(rule.id + 'Error');
        if (!field || !errorEl) return;

        field.classList.remove('is-invalid');
        errorEl.classList.remove('is-visible');
        errorEl.textContent = '';

        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          errorEl.textContent = rule.message;
          errorEl.classList.add('is-visible');
          valid = false;
        } else if (rule.pattern && !rule.pattern.test(field.value.trim())) {
          field.classList.add('is-invalid');
          errorEl.textContent = rule.patternMsg;
          errorEl.classList.add('is-visible');
          valid = false;
        }
      });

      if (valid) {
        // デモ：送信成功モーダル表示
        showSuccessModal();
        contactForm.reset();
      } else {
        // 最初のエラーフィールドへスクロール
        var firstError = contactForm.querySelector('.is-invalid');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });

    // リアルタイムバリデーション解除
    contactForm.querySelectorAll('.form-control').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
        var errorEl = document.getElementById(field.id + 'Error');
        if (errorEl) {
          errorEl.classList.remove('is-visible');
        }
      });
    });
  }

  function showSuccessModal() {
    var modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('is-open');
    }
  }

  // モーダルを閉じる
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.closest('.modal');
      if (modal) modal.classList.remove('is-open');
    });
  });

  /* ------------------------------------------
     製品フィルター（products.html）
  ------------------------------------------ */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-card[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        var category = btn.dataset.filter;

        productCards.forEach(function (card) {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();
