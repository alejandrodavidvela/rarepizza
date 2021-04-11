const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const chubbiesEl = document.getElementById('chubbies');
const resultHeading = document.getElementById('result-heading');
const single_chubbyEl = document.getElementById('single-chubby');
const get_age = document.getElementById('get-age');


function searchChubby(e){
    e.preventDefault();

    // Clear Single Chubby
    single_chubbyEl.innerHTML = '';

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
                        
                        

                        chubbiesEl.innerHTML = data.assets.map(asset => `
                            <div class="chubby">
                                <img src="${asset.image_url}" alt="${asset.name}" />
                                <div class="chubby-info" data-chubbyID="${asset.id}">
                                    <h3>${asset.name}</h3>
                                </div>
                                <div class="chubby-owner">
                                    <h3>Owner:</h3>
                                    <a class="chubby-address" href="https://etherscan.io/address/${asset.owner.address}">${asset.owner.address}</a>
                                </div>
                                <div class="chubby-traits">
                                    <h3>Bid on NFT:</h3>
                                    <a class="chubby-traits-link" href="https://opensea.io/assets/0x4ae57798AEF4aF99eD03818f83d2d8AcA89952c7/${term}">OpenSea</a>     
                                </div>
                                <div class="chubby-namebase">
                                    <h3>Bid on TLD:</h3>
                                    <a class="chubby-namebase-link" href="https://www.namebase.io/domains/phb">Namebase</a>     
                                </div>
                                
    
                            </div>
                        `).join('');
                    }
                    // Clear Search Text
                    search.value = '';
                });
        }else{
            alert('Please enter a Axie Number')
        }
    }
    
}



// Event Listener
submit.addEventListener('submit', searchChubby);
