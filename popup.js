
document.getElementById('open-options').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});




document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(null, (btnList) => {
    const container = document.getElementById('container')
    for (const [btnName, value] of Object.entries(btnList)) {
      const btn = document.createElement('button');
      btn.textContent = btnName
      container.appendChild(btn)
      btn.addEventListener("click", function () {
        copyToClipboard(value)
      });
    }
  })
});
function copyToClipboard(message) {
  navigator.clipboard.writeText(message)
    .then(() => {
      const container = document.getElementById('container')
      container.style.fontSize = '20px'
      container.style.color = '#fff';
      container.style.letterSpacing = '0.05em';
      container.style.backgroundColor = '#666';
      container.innerHTML = 'copied'
      setTimeout(() => {
        window.close()
      }, 1000)
    }
    )
    .catch(error => console.error("コピーできませんでした:", error));
}



class Prompt {

  static getSummaryArticle = `ここまでのやり取りを概要をまとめてWeb記事にしようと思います。適切な見出しと作業内容、コードなどを引用して記載してくれませんか。また質問単位で大見出しを作り、その後、小見出しとしてそれぞれの詳細を書いてほしいです。出力する文章は堅苦しくなくフレンドリーな文章にしてください。また見出しもキャッチーな文章にして、markdownで出力してください
  `
}
