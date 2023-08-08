let btnList = {
  記事作成: 'ここまでのやり取りを概要をまとめてWeb記事にしたいです。Markdownを使用して作成してください。このとき項目ごとにmarkdownを用いてフレンドリーでキャッチーな見出しと作業内容・先ほどの回答で使用したコードブロックを利用して作成してください。出力する文章は堅苦しくなくフレンドリーな文章にしてください。また冒頭には「この記事はOpenAIを用いて作成したものに加筆修正を加えたものです」と注意書きをしてください'
  ,本の概要作成:'ここにタイトルと、概要が箇条書きで記されています。SNSに投稿するために、100文字程度の推薦文章を書いてください。その際に他人の目を引くようなバズるワードを盛り込んでください丁寧語で、親しみやすく感情をこめて書いてください。また、その際に概要から伝わる感情（おすすめ！感動！興奮！など）をレビュアーとして前面に押し出してください。回答後には、その回答で使用した「バズるワード」「感情をこめて書いたフレーズ」を教えてください'
  ,こんにちは: 'ここからのやりとり',
}

document.addEventListener('DOMContentLoaded', function() {

  showContents()

  const addButton = document.querySelector('.add-button');
  addButton.addEventListener('click', () => {
    setInputDiv()
  });

  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', saveStorage);
});

function showContents()
{
  const expansion = new ChromeExpansion()
  expansion.get().then((r) => {
    const count = Object.keys(r).length;
    if (count == 0) {
      setInputDiv()
      return
    }
    for (const [btnName, value] of Object.entries(r)) {
      let params = {}
      params[btnName] = value
      setInputDiv(params)
    }

  })
}

function setInputDiv(object = '') {
  console.log(object)
  const isObject = typeof object == 'object'
  const title = isObject ? Object.keys(object)[0] : ''
  const value = isObject ? object[title] : ''
  console.log(typeof object)
  console.log(title)
  const inputsContainer = document.querySelector('.inputs');
  const inputDiv = document.createElement('div');
  inputDiv.classList.add('input-container');


  //title
  const textInputTitle = document.createElement('input');
  textInputTitle.type = 'text';
  textInputTitle.classList.add('text-input-title');
  textInputTitle.placeholder = 'Enter title';
  textInputTitle.value = title;

  // text
  const textInput = document.createElement('textarea');
  textInput.classList.add('text-input');
  textInput.placeholder = 'Enter text';
  textInput.value = value;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'remove';

  inputDiv.appendChild(textInputTitle);
  inputDiv.appendChild(textInput);
  inputDiv.appendChild(removeButton);
  inputsContainer.appendChild(inputDiv);

  removeButton.addEventListener('click', () =>{
    inputDiv.value = ''
    inputDiv.remove()
  })
}

function saveStorage()
{
    const textInputsTitle = document.querySelectorAll('.text-input-title');
    const textInputs = document.querySelectorAll('.text-input');
    let data = {};
    for(let i = 0; i < textInputs.length; i++) {
      const textDiv = textInputs[i]
      const textDivTitle = textInputsTitle[i]
      if(textDiv.value == "" || textDivTitle == '') {
        continue
      }
      data[textDivTitle.value] = textDiv.value
    }
    const expansion = new ChromeExpansion()
    expansion.clear()
    if(!Object.keys(data).length) {
      return
    }
    expansion.set(data)

}


class ChromeExpansion {

  /**
   * データを取得する
   */
  get(lists = null)
  {
    if (!Array.isArray(lists) && lists != null){
      throw new SyntaxError('型が違います')
    }
    let ret = {}
    const promise = new Promise((resolve) => {
        chrome.storage.local.get(lists, (items) => {
        resolve(items)
      })
    })
    return promise
  }

  /**
   * データを登録する
   */
  set(object)
  {
    if (typeof object != 'object'){
      throw new SyntaxError('型が違います')
    }
    chrome.storage.local.set(object, () => {
      console.log('success:')
      console.log(object)

    })
  }
  /**
   * すべて削除する
   */
  clear()
  {
    chrome.storage.local.clear()
  }
}