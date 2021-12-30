const input=document.getElementById('input');
const grid=document.getElementsByClassName('grid')[0];

window.addEventListener('load',dayNightMode);

input.addEventListener('keydown',function(event){
    if(event.key==='Enter'){
        loadImg();
    }
})


function loadImg(){
    removeImages();

    const url='https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=pnauQyoZzWcip8LVVp40bEFq5eFu0UNsphfFpBjojnA';

    fetch(url)
    .then((resp)=>{
        if(resp.ok)
            return resp.json()
        else
            alert(resp.status);
    })

    .then(data=>{
        const imageNodes=[];
        for(let i=0;i<data.results.length;i++){
            imageNodes[i]=document.createElement('div');
            imageNodes[i].className='img';
            imageNodes[i].style.background='url('+data.results[i].urls.raw+')';
            imageNodes[i].addEventListener('dblclick',function(){
                window.open(data.results[i].links.download,'_blank');

            })
            grid.appendChild(imageNodes[i]);
        }
    })
}

function removeImages(){
   grid.innerHTML='';
}

function dayNightMode(){
    const date=new Date();
    const hour=date.getHours();

    if(hour >=7 && hour<=17){
        document.body.style.background='whitesmoke';
        document.body.style.color='black';
    }
    else{
        document.body.style.background='black';
        document.body.style.color='white';
    }
}