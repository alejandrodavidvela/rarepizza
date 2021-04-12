const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const pizzasEl = document.getElementById('pizzas');
const resultHeading = document.getElementById('result-heading');
const single_pizzaEl = document.getElementById('single-pizza');
const get_age = document.getElementById('get-age');


function searchPizza(e){
    e.preventDefault();

    // Clear Single pizza
    single_pizzaEl.innerHTML = '';

    // Get Search Term
    const term = search.value;

    
    
    //Check for Empty
    if(term < 0 ){
        alert('Enter Rare Pizza #');
        search.value = '';
    }else{
        if(term.trim()){
            fetch(`https://api.opensea.io/api/v1/assets/?asset_contract_address=0x4ae57798AEF4aF99eD03818f83d2d8AcA89952c7&token_ids=${term}`)
                .then(res => res.json())
                .then(data => {
                    
                    if(data.assets === null){
                        resultHeading.innerHTML = `<p>There are no search results. Try Again!</p>`;
    
                    }else{
                        
                        const year = data.assets;
                        const currentYear = year[0].asset_contract.created_date.slice(0,4)
                        

                        
                        function updateCountdown() {
                            const currentTime = new Date().getUTCFullYear()
                            
                            const diff = currentTime - currentYear;
                            
                            return diff
                        }    
                        const diff = updateCountdown()
                        
                        

                        pizzasEl.innerHTML = data.assets.map(asset => `
                            <div class="pizza">
                                <img class="pizza-img" src="${asset.image_url}" alt="${asset.name}" />
                                <div class="pizza-info" data-pizzaID="${asset.id}">
                                    <h3>${asset.name}</h3>
                                </div>
                                <div class="pizza-owner">
                                    <h3>Owner:</h3>
                                    <a class="pizza-address" href="https://etherscan.io/address/${asset.owner.address}">${asset.owner.address}</a>
                                </div>
                                <div class="pizza-traits">
                                    <h3>Bid on NFT:</h3>
                                    <a class="pizza-traits-link" href="https://opensea.io/assets/0x4ae57798AEF4aF99eD03818f83d2d8AcA89952c7/${term}">OpenSea</a>     
                                </div>
                                <div class="pizza-namebase">
                                    <h3>Bid on TLD:</h3>
                                    <a class="pizza-namebase-link" href="https://www.namebase.io/domains/phb">Namebase</a>     
                                </div>
                                
    
                            </div>
                        `).join('');
                    }
                    // Clear Search Text
                    search.value = '';
                });
        }else{
            alert('Please enter a Pizza Number')
        }
    }
    
}



// Event Listener
submit.addEventListener('submit', searchPizza);
