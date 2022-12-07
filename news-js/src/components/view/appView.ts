import { Article, Source, Data } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: Data): void {
    const values: Article[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: Data): void {
    const values: Source[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
