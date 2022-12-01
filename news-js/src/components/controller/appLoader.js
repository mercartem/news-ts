import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '8cd53810f57a41c6951fe15558e103f6', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
