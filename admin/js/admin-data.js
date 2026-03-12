/* ============================================
   管理画面 データ層
   localStorage CRUD + シードデータ
   ============================================ */

var AdminData = (function () {
  'use strict';

  var PRODUCTS_KEY = 'ap_products';
  var INQUIRIES_KEY = 'ap_inquiries';

  /* ------------------------------------------
     シードデータ: 製品（既存9件）
  ------------------------------------------ */
  var SEED_PRODUCTS = [
    {
      code: 'AP-BRK-001',
      name: 'ブレーキパッド（フロント用）',
      category: 'brake',
      maker: '曙ブレーキ工業',
      image: 'brk-001.jpg',
      description: '国産乗用車・軽自動車対応。摩耗インジケーター付き。OEM同等品。低ダスト・低ノイズ設計。'
    },
    {
      code: 'AP-BRK-002',
      name: 'ブレーキパッド（リア用）',
      category: 'brake',
      maker: 'アドヴィックス',
      image: 'brk-002.jpg',
      description: '国産乗用車・SUV対応。純正同等品質。耐熱性・耐久性に優れた素材を採用。'
    },
    {
      code: 'AP-BRK-010',
      name: 'ブレーキローター（フロント）',
      category: 'brake',
      maker: 'Brembo',
      image: 'brk-010.jpg',
      description: 'ベンチレーテッドディスク。高い放熱性と制動力を実現。防錆コーティング処理済み。'
    },
    {
      code: 'AP-ENG-015',
      name: 'エンジンオイルフィルター',
      category: 'engine',
      maker: 'DENSO',
      image: 'eng-015.jpg',
      description: '高フィルタリング効率。国産主要車種に幅広く対応。バイパスバルブ内蔵。交換目安：5,000km。'
    },
    {
      code: 'AP-ENG-022',
      name: 'エアフィルター（エンジン用）',
      category: 'engine',
      maker: 'Bosch',
      image: 'eng-022.jpg',
      description: '高捕集効率のペーパーフィルター。異物の吸入を防ぎエンジン寿命を延伸。国産・輸入車対応品あり。'
    },
    {
      code: 'AP-SUS-008',
      name: 'ショックアブソーバー（リア）',
      category: 'suspension',
      maker: 'KYB',
      image: 'sus-008.jpg',
      description: 'ガス封入式。乗り心地と操縦安定性を高次元でバランス。1年保証付き。主要国産車対応。'
    },
    {
      code: 'AP-SUS-014',
      name: 'ロアアームブッシュ',
      category: 'suspension',
      maker: 'Moog',
      image: 'sus-014.jpg',
      description: '高耐久ゴム素材使用。走行時の振動・騒音を低減。フロントサスペンション用。'
    },
    {
      code: 'AP-ELC-031',
      name: 'オルタネーター（発電機）',
      category: 'electrical',
      maker: 'DENSO',
      image: 'elc-031.jpg',
      description: 'リビルト品。出力：70A〜120A各種。コア引取対応。1年または走行20,000km保証。'
    },
    {
      code: 'AP-ELC-045',
      name: 'スターターモーター',
      category: 'electrical',
      maker: 'Bosch',
      image: 'elc-045.jpg',
      description: 'リビルト品。エンジン始動性に優れた高品質品。主要国産車・一部輸入車対応。コア引取可。'
    }
  ];

  /* ------------------------------------------
     シードデータ: お問い合わせ（12件）
  ------------------------------------------ */
  var SEED_INQUIRIES = (function () {
    var now = new Date();
    function daysAgo(d) {
      var dt = new Date(now);
      dt.setDate(dt.getDate() - d);
      return dt.toISOString();
    }

    return [
      { id: 'INQ-001', date: daysAgo(1),  company: '株式会社ヤマト自動車',     name: '山田 太郎', tel: '03-1234-5678', email: 'yamada@yamato-auto.co.jp', subject: '在庫確認・見積依頼',   message: 'AP-BRK-001の在庫状況と単価をご確認いただけますでしょうか。50個単位での発注を検討しています。', status: 'open' },
      { id: 'INQ-002', date: daysAgo(2),  company: '有限会社サクラ整備',       name: '鈴木 花子', tel: '06-9876-5432', email: 'suzuki@sakura-sebi.co.jp', subject: '製品仕様の問い合わせ', message: 'AP-ENG-015について、対応車種一覧を教えていただけますか。トヨタ・ホンダ・日産の主要車種を確認したいです。', status: 'open' },
      { id: 'INQ-003', date: daysAgo(3),  company: '東京パーツセンター',       name: '田中 一郎', tel: '03-5555-1111', email: 'tanaka@tpc.co.jp',         subject: '取引条件の相談',     message: '月次での定期発注を検討しています。まとめ買い割引や支払い条件についてご相談させてください。', status: 'open' },
      { id: 'INQ-004', date: daysAgo(4),  company: '株式会社北海道オートパーツ', name: '佐藤 健', tel: '011-222-3333',  email: 'sato@hap.co.jp',          subject: '在庫確認・見積依頼',   message: 'AP-SUS-008を20本、AP-SUS-014を30個見積もりをお願いします。配送は北海道になります。', status: 'in-progress' },
      { id: 'INQ-005', date: daysAgo(5),  company: '九州自動車部品株式会社',   name: '高橋 誠',  tel: '092-888-4444', email: 'takahashi@kap.co.jp',     subject: '製品仕様の問い合わせ', message: 'AP-ELC-031のリビルト品について、コア引き取りの手続きを詳しく教えてください。', status: 'in-progress' },
      { id: 'INQ-006', date: daysAgo(7),  company: '中部パーツ卸売株式会社',   name: '伊藤 明',  tel: '052-777-2222', email: 'ito@chubu-parts.co.jp',   subject: '取引条件の相談',     message: '新規取引の開始について相談したいです。カタログと価格表をご送付いただけますか。', status: 'in-progress' },
      { id: 'INQ-007', date: daysAgo(8),  company: '大阪モータース',           name: '渡辺 拓',  tel: '06-3333-9999', email: 'watanabe@osaka-motors.jp', subject: '在庫確認・見積依頼',   message: 'AP-BRK-010を100枚注文したいのですが、現在の在庫数と納期を教えてください。', status: 'in-progress' },
      { id: 'INQ-008', date: daysAgo(10), company: '埼玉カーパーツ有限会社',   name: '中村 優',  tel: '048-666-7777', email: 'nakamura@scp.co.jp',      subject: 'その他',             message: 'カタログの郵送をお願いしたいのですが、可能でしょうか。', status: 'in-progress' },
      { id: 'INQ-009', date: daysAgo(12), company: '名古屋オートサービス',     name: '小林 洋',  tel: '052-444-5555', email: 'kobayashi@nas.co.jp',     subject: '製品仕様の問い合わせ', message: 'AP-ENG-022の国産・輸入車対応品の具体的な型番リストをいただけますか。', status: 'in-progress' },
      { id: 'INQ-010', date: daysAgo(15), company: '福岡部品センター',         name: '加藤 仁',  tel: '092-555-3333', email: 'kato@fpc.co.jp',          subject: '在庫確認・見積依頼',   message: 'AP-ELC-045を5個、見積もりをお願いします。コア引取の条件もあわせてご確認ください。', status: 'done' },
      { id: 'INQ-011', date: daysAgo(20), company: '東北自動車パーツ株式会社', name: '吉田 勝',  tel: '022-111-4444', email: 'yoshida@tap.co.jp',       subject: '取引条件の相談',     message: '年間契約での価格交渉をしたいです。担当者のご連絡をお待ちしています。', status: 'done' },
      { id: 'INQ-012', date: daysAgo(28), company: '神奈川オートパーツ',       name: '松本 剛',  tel: '045-999-2222', email: 'matsumoto@kap2.co.jp',   subject: 'その他',             message: '展示会への出展予定がありましたら教えてください。直接お話を伺いたいです。', status: 'done' }
    ];
  }());

  /* ------------------------------------------
     内部ヘルパー
  ------------------------------------------ */
  function load(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function initProducts() {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
      save(PRODUCTS_KEY, SEED_PRODUCTS);
    }
  }

  function initInquiries() {
    if (!localStorage.getItem(INQUIRIES_KEY)) {
      save(INQUIRIES_KEY, SEED_INQUIRIES);
    }
  }

  /* ------------------------------------------
     公開API
  ------------------------------------------ */
  return {
    init: function () {
      initProducts();
      initInquiries();
    },

    /* 製品 */
    getProducts: function () {
      initProducts();
      return load(PRODUCTS_KEY) || [];
    },

    saveProduct: function (product) {
      var products = this.getProducts();
      var idx = -1;
      for (var i = 0; i < products.length; i++) {
        if (products[i].code === product.code) { idx = i; break; }
      }
      if (idx >= 0) {
        products[idx] = product;
      } else {
        products.push(product);
      }
      save(PRODUCTS_KEY, products);
    },

    deleteProduct: function (code) {
      var products = this.getProducts().filter(function (p) {
        return p.code !== code;
      });
      save(PRODUCTS_KEY, products);
    },

    getProductByCode: function (code) {
      var products = this.getProducts();
      for (var i = 0; i < products.length; i++) {
        if (products[i].code === code) return products[i];
      }
      return null;
    },

    /* お問い合わせ */
    getInquiries: function () {
      initInquiries();
      return load(INQUIRIES_KEY) || [];
    },

    updateInquiryStatus: function (id, status) {
      var inquiries = this.getInquiries();
      for (var i = 0; i < inquiries.length; i++) {
        if (inquiries[i].id === id) {
          inquiries[i].status = status;
          break;
        }
      }
      save(INQUIRIES_KEY, inquiries);
    },

    /* 統計 */
    getStats: function () {
      var products = this.getProducts();
      var inquiries = this.getInquiries();
      var categories = {};
      products.forEach(function (p) {
        categories[p.category] = (categories[p.category] || 0) + 1;
      });
      var openCount = inquiries.filter(function (q) { return q.status === 'open'; }).length;
      return {
        productCount: products.length,
        categoryCount: Object.keys(categories).length,
        inquiryCount: inquiries.length,
        openCount: openCount,
        categories: categories
      };
    }
  };
}());
