import { Robokassa } from "@dev-aces/robokassa";

const robokassa = new Robokassa({
  merchantLogin: 'lionsdirect',
  password1: 'lovP36v74XUWJKMwp8hF',
  password2: 's2KSZ1kwXpMXbe7WT5V2',
  // hashAlgorithm: 'md5' (default)
  // isTest: false (default)
  // url: 'https://auth.robokassa.ru/Merchant/Index.aspx' (default)
});

const tarifTest = robokassa.generatePaymentUrl({
  outSum: 4900,
  description: 'Продвижение в соц. сетях. Тариф TEST',
  culture: 'ru',
  // Пользовательские параметры должны начинаться с "shp_" или "Shp_" или "SHP_".
  // Они будут переданы на ваш сервер вызовом Робокассы после оплаты в том же виде.
  userParameters: {
    shp_interface: 'link',
    shp_user_id: 'user_id',
  },

  // фискализация
  receipt: {
    items: [
      {
        sum: 4900,
        name: 'Продвижение в социальных сетях. Тариф TEST',
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'service',
        tax: 'none',
      },
    ],
  },
});

const tarifMedium = robokassa.generatePaymentUrl({
  outSum: 9500,
  description: 'Продвижение в соц. сетях. Тариф MEDIUM',
  culture: 'ru',
  userParameters: {
    shp_interface: 'link',
    shp_user_id: 'user_id',
  },

  receipt: {
    items: [
      {
        sum: 9500,
        name: 'Продвижение в социальных сетях. Тариф MEDIUM',
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'service',
        tax: 'none',
      },
    ],
  },
});

const tarifGold = robokassa.generatePaymentUrl({
  outSum: 18600,
  description: 'Продвижение в соц. сетях. Тариф GOLD',
  culture: 'ru',
  userParameters: {
    shp_interface: 'link',
    shp_user_id: 'user_id',
  },

  receipt: {
    items: [
      {
        sum: 18600,
        name: 'Продвижение в социальных сетях. Тариф GOLD',
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'service',
        tax: 'none',
      },
    ],
  },
});

const tarifVip = robokassa.generatePaymentUrl({
  outSum: 43500,
  description: 'Продвижение в соц. сетях. Тариф VIP',
  culture: 'ru',
  userParameters: {
    shp_interface: 'link',
    shp_user_id: 'user_id',
  },

  receipt: {
    items: [
      {
        sum: 43500,
        name: 'Продвижение в социальных сетях. Тариф VIP',
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'service',
        tax: 'none',
      },
    ],
  },
});



export { tarifTest, tarifMedium, tarifGold, tarifVip }