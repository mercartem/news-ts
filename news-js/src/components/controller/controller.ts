import AppLoader from './appLoader';
import { Callback, Endpoints } from '../../types/index';

class AppController extends AppLoader {
  getSources(callback: Callback): void {
    super.getResp(
      {
        endpoint: Endpoints.Sources,
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: Callback): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: Endpoints.News,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }

  findByLetter() {
    const btns = document.querySelectorAll<HTMLElement>('.search__item');
    const links = document.querySelectorAll<HTMLElement>('.source__item-name');

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', () => {
        const btn = btns[i].textContent as string;
        for (let j = 0; j < links.length; j++) {
          const link = links[j].textContent as string;
          if (btn[0] === link[0].toUpperCase()) {
            links[j].scrollIntoView({ block: 'start', behavior: 'smooth' });
            break;
          }
        }
      });
    }
  }
}

export default AppController;
