export class Champions {

    searchChamp(champname)  {
        const endpoint = `https://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/${champname}.json`
       
        return new Promise((resolve, reject) => {
          fetch(endpoint, {method: 'GET'})
          .then(response => response.json())
          .then(({data}) => { 
            
            resolve(data[champname])})
            .catch((err) => {
                reject('Campeão não encontrado')
            })
        })
        
      }


    async search(champname) {

        


        try {
            
            const newChampName = champname.split(' ')
            
            
            
            
             for(let i=0; i < newChampName.length; i++) {
                 newChampName[i] = newChampName[i].charAt(0).toUpperCase() + newChampName[i].slice(1) 
             }

            // console.log(newChampName2)

            // function capitalizeFirstLetter(string) {
            //     return string.charAt(0).toUpperCase() + string.slice(1);
            // }
            
            const finalName = newChampName.join('')
            

            console.log(finalName)
            
            
                  

            const {name, title, tags} = await this.searchChamp(finalName)

        
            return {name, title, tags, image: finalName}
        } catch(err) {
            console.log(err)
        }

       
        
        
       

        
            
        

    }
}


