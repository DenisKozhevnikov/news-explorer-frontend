// const NEWS_URL = "http://newsapi.org/v2";
const NEWS_URL = "https://nomoreparties.co/news/v2";
const TOKEN = "d02f3f60692b4ab695731fcd64a27c0a";

const date = new Date();
const toDate = date.toISOString().split("T")[0];
const fromDate = new Date(date.getTime() - 24 * 60 * 60 * 1000 * 7)
  .toISOString()
  .split("T")[0];

const pageSize = 100;

export async function onGetNews(request) {
  const res = await fetch(
    `${NEWS_URL}/everything?q=${request}&from=${fromDate}&to=${toDate}&pageSize=${pageSize}&apiKey=${TOKEN}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}
