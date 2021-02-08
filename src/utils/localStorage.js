const NEWS_KEY = "news";
const KEYWORD_KEY = "keyword";

export const setNews = (news) => {
  localStorage.setItem(NEWS_KEY, news);
};

export const getNews = () => localStorage.getItem(NEWS_KEY);

export const removeNews = () => {
  localStorage.removeItem(NEWS_KEY);
};

export const setKeywordToStorage = (keyword) => {
  localStorage.setItem(KEYWORD_KEY, keyword);
};

export const getKeywordFromStorage = () => localStorage.getItem(KEYWORD_KEY);

export const removeKeywordFromStorage = () => {
  localStorage.removeItem(KEYWORD_KEY);
};
