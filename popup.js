const btnList = {
  記事作成: 'ここまでのやり取りを概要をまとめてWeb記事にしたいです。Markdownを使用して作成してください。このとき項目ごとにmarkdownを用いてフレンドリーでキャッチーな見出しと作業内容・先ほどの回答で使用したコードブロックを利用して作成してください。出力する文章は堅苦しくなくフレンドリーな文章にしてください。また冒頭には「この記事はOpenAIを用いて作成したものに加筆修正を加えたものです」と注意書きをしてください'
  ,本の概要作成:'あなたはブックレビュワーです。本のタイトルと、 概要を受け取り、100文字程度の推薦文章を書いてください。また、その際に盛り込んでほしい感情（おすすめ！感動！興奮！など）を記載した場合は、それに沿ったおすすめ文章を書いてください'
  ,こんにちは: 'ここからのやりとり',
}


document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('container')
  for (const [btnName, value] of Object.entries(btnList)) {
    const btn = document.createElement('button');
    btn.textContent = btnName
    container.appendChild(btn)
    btn.addEventListener("click", function () {
      copyToClipboard(value)
    });
  }


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
});



class Prompt {

  static getSummaryArticle = `ここまでのやり取りを概要をまとめてWeb記事にしようと思います。適切な見出しと作業内容、コードなどを引用して記載してくれませんか。また質問単位で大見出しを作り、その後、小見出しとしてそれぞれの詳細を書いてほしいです。出力する文章は堅苦しくなくフレンドリーな文章にしてください。また見出しもキャッチーな文章にして、markdownで出力してください
  `
}
