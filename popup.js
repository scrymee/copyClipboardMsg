document.addEventListener("DOMContentLoaded", function() {
  const copyBtn = document.getElementById("copyBtn");
  const copyBtnLists = document.getElementsByClassName("copyBtnList");
  Array.from(copyBtnLists).forEach((btn) => {
    btn.addEventListener("click", function() {
      copyToClipboard()
    });

  })
  copyBtn.addEventListener("click", function() {
  });

  function copyToClipboard() {

    navigator.clipboard.writeText(Prompt.getSummaryArticle)
      .then(() => {
          const message = document.getElementById('message')
          message.style.display = 'block'
          const container = document.getElementById('container')
          container.style.display = 'none'
          setTimeout(() => {
            window.close()
          }, 1000)
        }
      )
      .catch(error => console.error("コピーできませんでした:", error));
  }
});



class Prompt {

  static getSummaryArticle = `ここまでのやり取りを概要をまとめてWeb記事にしようと思います。適切な見出しと作業内容、コードなどを引用して記載してくれませんか。また質問単位で大見出しを作り、その後、小見出しとしてそれぞれの詳細を書いてほしいです。出力する文章は堅苦しくなくフレンドリーな文章にしてください。また見出しもキャッチーな文章にして、markdownで出力してください
  `
}