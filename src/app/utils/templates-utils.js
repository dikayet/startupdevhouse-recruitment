export const getArticleTemplate = (article) => `
  <li>
    <article class="news">
      <header>
        <h3>${article.webTitle}</h3>
      </header>
      <section class="newsDetails">
        <ul>
          <li><strong>Section Name: </strong>${article.sectionName}</li>
          <li><strong>Publication Date: </strong>${article.webPublicationDate}</li>
        </ul>
      </section>
      <section class="newsActions">
        <a href="${article.webUrl}" class="button">Full article</a>
        <button class="button button-outline" onclick="saveArticle({
            id: \`${article.id}\`,
            title: \`${article.webTitle}\`,
            url: \`${article.webUrl}\`,
        })">Read Later</button>
      </section>
    </article>
  </]li>
`;

export const getPageSelectOptionTemplate = (pageNumber) =>
  `<option value="${pageNumber}">${pageNumber}</option>`;

export const getNoArticlesWarningTemplate = () => '<p>No articles found</p>';

export const getSavedArticleTemplate = (article) => `              
  <li>
    <h4 class="readLaterItem-title">${article.title}</h4>
    <section>
      <a href="${article.url}" class="button button-clear">Read</a>
      <button class="button button-clear" onclick="removeArticle(\`${article.id}\`)">Remove</button>
    </section>
  </li>
`;
