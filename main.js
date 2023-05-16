const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCba1vMvOHWlMddLARS382Zw&part=snippet%2Cid&order=date&maxResults=50'

const content = null || document.getElementById('content123')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd2103bcf1bmshe5c3db4c2e5401bp10ee72jsn65868c01ce8e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  // console.log(data)
  return data;
}

function goPage(link){
  window.open(link, "_blank")
}

const loadVideo = async (numberVideos)=> {
  try{
    const videos = await fetchData(API)
    let a = 0
    videos.items.map(itemVideo=>{
      if(a == numberVideos)return
      link = `https://www.youtube.com/watch?v=${itemVideo.id.videoId}_channel=${itemVideo.snippet.channelTitle.split(" ").join("")}`
      if(itemVideo.snippet.title.split("-")[0].trim() === 'HABLANDO HUEVADAS'){
        a++
        let view = `
        <div class="group relative cursor-pointer" onclick= goPage('${link}')>
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${itemVideo.snippet.thumbnails.high.url}" alt="${itemVideo.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-blue-500">
              <span aria-hidden="true" class="absolute inset-0 "></span>
              ${itemVideo.snippet.title}
            </h3>
          </div>
        </div>`
        content.innerHTML += view
      }
      })
      // a.slice(0,5).join('')  //slice(0.4) solo mostrara 4 elementos si no lo pongo mostraria los 5 que quiero 
  }
  catch (error) {
    console.log(error)
  }
}
window.location.pathname == "/landing-HH/index.html" || window.location.pathname == "/landing-HH/videos.html"
  ?loadVideo(4)
  :loadVideo(50)