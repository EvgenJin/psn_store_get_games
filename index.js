const fetch = require('node-fetch'),
      HttpsProxyAgent = require('https-proxy-agent');
    
    let games_arr = []
    let types = ['Комплект','Игра PSN']
    

  function getGame(querry) {  
    fetch('https://store.playstation.com/chihiro-api/bucket-search/RU/ru/999/'+querry+'?size=10', {
        method: "GET",
        agent:new HttpsProxyAgent('http://proxy.gpb.ural.ru:3128'),
        headers : {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
      res.categories.games.links.forEach(element => {
       let item = {}
       if (element.top_category == 'downloadable_game' && types.includes(element.game_contentType)) {
          // console.log(element)         
          if(element.release_date) {item.release_date = element.release_date}
          if(element.name) {item.name = element.name}
          if(element.default_sku) {item.price = element.default_sku.price/100}
          games_arr.push(item)
       }
      });
    })
    .then(res => console.log(games_arr))
  }

  getGame('Blair witch')

//'https://store.playstation.com/chihiro-api/bucket-search/RU/ru/999/metro%20exodus?size=10'