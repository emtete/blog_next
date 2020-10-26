const fs = require("fs");
const fetch = require("node-fetch");
const prettier = require("prettier");
const axios = require("axios");

const getDate = new Date().toISOString();

const fetchUrl = "https://api.dev-life.kr/post/getList?userId=1";
const YOUR_AWESOME_DOMAIN = "https://dev-life.kr";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  // const fetchPosts = await fetch(fetchUrl)
  //   .then((res) => console.log(res)) //res.json()
  //   .catch((err) => console.log(err));

  const fetchPosts = axios
    .get(fetchUrl, {
      withCredentials: true,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  console.log("fetchPosts : ", fetchPosts);

  // const postList = [];
  // fetchPosts.forEach((post) => postList.push(post.id));

  // const postListSitemap = `
  //   ${postList
  //     .map((id) => {
  //       return `
  //         <url>
  //           <loc>${`${YOUR_AWESOME_DOMAIN}/post/${id}`}</loc>
  //           <lastmod>${getDate}</lastmod>
  //         </url>`;
  //     })
  //     .join("")}
  // `;

  // const generatedSitemap = `
  //   <?xml version="1.0" encoding="UTF-8"?>
  //   <urlset
  //     xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  //     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  //     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  //   >
  //     ${postListSitemap}
  //   </urlset>
  // `;

  // const formattedSitemap = [formatted(generatedSitemap)];

  // fs.writeFileSync("../public/sitemap-posts.xml", formattedSitemap, "utf8");
})();
