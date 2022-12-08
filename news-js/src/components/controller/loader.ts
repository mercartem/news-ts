import type { Options, GetRespOptions, Callback, Endpoints } from '../../types/index';

class Loader {
  private baseLink: string;
  private options: Pick<Options, 'apiKey'>;
  constructor(baseLink: string, options: Pick<Options, 'apiKey'>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp(
    { endpoint, options = {} }: GetRespOptions,
    callback: Callback = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  protected errorHandler<T extends Response>(res: T): T {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  protected makeUrl(options: Partial<Options>, endpoint: string): string {
    const urlOptions: { [index: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  protected load(
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    endpoint: Endpoints,
    callback: Callback,
    options: Partial<Options> = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => console.error(err));
  }
}

export default Loader;
