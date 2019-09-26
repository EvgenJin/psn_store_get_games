const fetch = require('node-fetch'),HttpsProxyAgent = require('https-proxy-agent');
  let games_arr = []
  let types = ['Комплект','Игра PSN']

  getGame('Division 2')

  function getGame(querry) {
    fetch('https://store.playstation.com/chihiro-api/bucket-search/RU/ru/999/'+querry+'?size=10', {
        method: "GET",
        agent:new HttpsProxyAgent('http://proxy.url.ru:3128'),
        headers : {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
      res.categories.games.links.forEach(element => {
       if (element.top_category == 'downloadable_game' && types.includes(element.game_contentType)) {
          let disc = getDiscount(element.url)
          let discount = {}
          disc.then(res => res.json()).then(res => {
            if (element.name) {discount.name = element.name}
            if (element.release_date) {discount.release_date = element.release_date}
            if (element.default_sku) {discount.regular_price = element.default_sku.price/100}
            if (res.default_sku.rewards[0].price) {discount.sale_price = res.default_sku.rewards[0].price/100}
            if (res.default_sku.rewards[0].start_date) {discount.sale_start_date = res.default_sku.rewards[0].start_date}
            if (res.default_sku.rewards[0].end_date) {discount.sale_end_date = res.default_sku.rewards[0].end_date}                         
          })
          .then(res => console.log(discount))
       }
      });
    })
    // .then(res => console.log(games_arr))
  }

  function getDiscount(url) {
    return fetch(url,{
      method: "GET",
      agent:new HttpsProxyAgent('http://proxy.url.ru:3128'),
      headers : {
          "Content-Type": "application/json"
      }      
    })
    let j = response.json();
    return j;
  }