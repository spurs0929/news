/* eslint-disable */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

exports.cors = {
  origin: '*',
  allowMethod: 'GET,POST,PUT,DELETE,HEAD,PATCH'
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1673917471845_8092';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // cors
  config.cors = {
    origin: () => '*',
    allowMethods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
    credentials: true
  }

  // 關閉csrf設置
  config.security = {
    csrf: {
      enable: false
    }
  }

  // 請求API地址
  const userConfig = {
    APP_KEY: '5f2a6f48f30c9ba3ec8df73793458b0f',
    API: {
      GET_NEWS_LIST: 'http://v.juhe.cn/toutiao/index'
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...userConfig
  };
};
