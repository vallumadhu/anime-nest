// searchBar
let searchInput = document.getElementById("searchInput")
let searchBtn = document.getElementById("searchBtn")
let searchData = document.getElementById("searchData")
searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim() != "") {
        fetchdata(searchInput.value)
        searchData.innerHTML = ""
        let loading = document.createElement("div")
        loading.classList.add("loading")
        searchData.classList.add("searchDataActive")
        searchData.appendChild(loading)
    }
})
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        if (document.activeElement == searchInput) {
            if (searchInput.value.trim() != "") {
                fetchdata(searchInput.value)
                searchData.innerHTML = ""
                let loading = document.createElement("div")
                loading.classList.add("loading")
                searchData.appendChild(loading)
            }
        }
    }
})
document.addEventListener("click", (e) => {
    if (!document.getElementById("searchBar").contains(e.target)) {
        searchData.innerHTML = ""
    }
})
async function fetchdata(input) {
    input = (String(input)).trim()
    input = (input.split(" ")).join("+")
    let url = `https://api.jikan.moe/v4/anime?q=${input}`
    await fetch(url)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data.data
        }).then((data) => {
            let n = data.length
            for (let i = 0; i < n; i++) {
                let load = searchData.lastElementChild
                load.remove()
                let card = document.createElement("div")
                let img = document.createElement("img")
                let name = document.createElement("p")
                let year = document.createElement("p")
                let episodes = document.createElement("p")
                let airning = document.createElement("p")
                let box1 = document.createElement("div")
                let box2 = document.createElement("div")
                let malID = document.createElement("p")
                malID.innerHTML = data[i].mal_id
                card.classList.add("card")
                img.setAttribute("src", data[i].images.jpg.image_url)
                card.appendChild(img)
                name.innerText = data[i].titles[0].title
                box1.appendChild(name)
                year.innerText = `( ${data[i].type}, ${data[i].aired.prop.from.year} )`
                box1.appendChild(year)
                card.appendChild(box1)
                let ep = data[i].episodes
                ep = ep == null ? "-" : ep
                episodes.innerText = `${ep} Episodes`
                box2.appendChild(episodes)
                airning.innerText = data[i].status
                box2.appendChild(airning)
                card.appendChild(box2)
                malID.classList.add("malId")
                card.appendChild(malID)
                searchData.appendChild(card)
                searchData.appendChild(load)
                card.addEventListener("click", () => {
                    infoBox.style.display = "block"
                    animeSynopsis.innerHTML = data[i].synopsis
                    let ytLink = data[i].trailer.embed_url
                    if (data[i].trailer.embed_url == null) {
                        ytLink = ""
                    }
                    yt.setAttribute("src", ytLink)
                    animeName.innerHTML = data[i].titles[0].title
                    animeSource.innerHTML = "Source: " + data[i].source
                    animeStatus.innerHTML = data[i].status
                    animeEpisodes.innerHTML = data[i].episodes + " Episodes"
                    imgLink.setAttribute("src", data[i].images.jpg.image_url)
                    malScore.innerHTML = "MAL Score: " + data[i].score
                    malRank.innerHTML = "Ranked #" + data[i].rank
                    animeStudio.innerHTML = "Studio: " + data[i].studios[0].name
                })
            }
            let load = searchData.lastElementChild
            load.remove()
        })
}





//slider
let slider = document.getElementById("slider")
slider.style.transform = "translateX(0px)"
let sliderBtn1 = document.getElementById("sliderBtn1")
let sliderBtn2 = document.getElementById("sliderBtn2")
let sliderBtn3 = document.getElementById("sliderBtn3")
let sliderBtn4 = document.getElementById("sliderBtn4")
let sliderBtn5 = document.getElementById("sliderBtn5")
let sliderBtns = document.querySelectorAll(".sliderBtn")
function sliderBtnClass(x) {
    sliderBtns.forEach((btn) => {
        btn.classList.add("sliderBtnInactive")
        btn.classList.remove("sliderBtnActive")
    })
    x.classList.remove("sliderBtnInactive")
    x.classList.add("sliderBtnActive")
}
sliderBtn1.addEventListener("click", () => {
    slider.style.transform = "translateX(0px)"
    sliderBtnClass(sliderBtn1)
})
sliderBtn2.addEventListener("click", () => {
    slider.style.transform = "translateX(-100%)"
    sliderBtnClass(sliderBtn2)
})
sliderBtn3.addEventListener("click", () => {
    slider.style.transform = "translateX(-200%)"
    sliderBtnClass(sliderBtn3)
})
sliderBtn4.addEventListener("click", () => {
    slider.style.transform = "translateX(-300%)"
    sliderBtnClass(sliderBtn4)
})
sliderBtn5.addEventListener("click", () => {
    slider.style.transform = "translateX(-400%)"
    sliderBtnClass(sliderBtn5)
})

const sliderScroll = () => {
    if (slider.style.transform == "translateX(-400%)") {
        slider.style.transform = "translateX(0px)"
        sliderBtnClass(sliderBtn1)
    } else if (slider.style.transform == "translateX(-300%)") {
        slider.style.transform = "translateX(-400%)"
        sliderBtnClass(sliderBtn5)
    } else if (slider.style.transform == "translateX(-200%)") {
        slider.style.transform = "translateX(-300%)"
        sliderBtnClass(sliderBtn4)
    } else if (slider.style.transform == "translateX(-100%)") {
        slider.style.transform = "translateX(-200%)"
        sliderBtnClass(sliderBtn3)
    } else if (slider.style.transform == "translateX(0px)") {
        slider.style.transform = "translateX(-100%)"
        sliderBtnClass(sliderBtn2)
    }
}
let sliderInterval = setInterval(sliderScroll, 3000)
slider.addEventListener("mouseover", () => {
    clearInterval(sliderInterval)
})
slider.addEventListener("mouseout", () => {
    sliderInterval = setInterval(sliderScroll, 3000)
})



// airing/top slider
function leftRightBtn(n) {
    let childBox = document.getElementById("childBox" + n)
    let aringBack = document.getElementById("aringBack" + n)
    let aringNext = document.getElementById("aringNext" + n)

    let childBoxWidth = childBox.offsetWidth
    let childWidth = childBox.children[0].offsetWidth + 20
    let displayChildren = Math.round(childBoxWidth/childWidth)
    let hiddenChildren = 10 - displayChildren
    let transformLimit = hiddenChildren * childWidth
    let transform = 0

    aringNext.addEventListener("click", () => {
        if(transform < transformLimit){
            transform = childWidth + transform
            childBox.style.transform = "translateX(-"+ transform +"px)"
        }
    })
    aringBack.addEventListener("click", () => {
        if(transform > 0){
            transform =  transform - childWidth
            childBox.style.transform = "translateX(-"+ transform +"px)"
        }
    })
    
}
leftRightBtn(1)
leftRightBtn(2)
leftRightBtn(3)
async function GetTopAnime(a_childBox, category) {
    await fetch(`https://api.jikan.moe/v4/top/anime?filter=${category}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data.data
        }).then((data) => {
            data = data.slice(0, 10)
            let childBox = a_childBox.children
            for (let i = 0; i < 10; i++) {
                let child = childBox[i]
                child.innerHTML = ""
                child.classList.remove("child")
                child.classList.add("child1")
                let img = document.createElement("img")
                img.setAttribute("src", data[i].images.jpg.image_url)
                child.appendChild(img)
                let name = document.createElement("p")
                name.innerHTML = data[i].titles[0].title
                child.appendChild(name)
                let malID = document.createElement("p")
                malID.innerHTML = data[i].mal_id
                malID.classList.add("malId")
                child.appendChild(malID)
                child.addEventListener("click", () => {
                    infoBox.style.display = "flex"
                    animeSynopsis.innerHTML = data[i].synopsis
                    let ytLink = data[i].trailer.embed_url
                    if (data[i].trailer.embed_url == null) {
                        ytLink = ""
                    }
                    yt.setAttribute("src", ytLink)
                    animeName.innerHTML = data[i].titles[0].title
                    animeSource.innerHTML = "Source: " + data[i].source
                    animeStatus.innerHTML = data[i].status
                    animeEpisodes.innerHTML = data[i].episodes + " Episodes"
                    imgLink.setAttribute("src", data[i].images.jpg.image_url)
                    malScore.innerHTML = "MAL Score: " + data[i].score
                    malRank.innerHTML = "Ranked #" + data[i].rank
                    animeStudio.innerHTML = "Studio: " + data[i].studios[0].name
                })
            }
        })
}
GetTopAnime(childBox2, "")
setTimeout(GetTopAnime(childBox1, "airing"), 500)
setTimeout(GetTopAnime(childBox3, "bypopularity"), 1000)

//infoBox
let infoBox = document.getElementById("infoBox")
let cancelBtn = document.getElementById("cancelBtn")
cancelBtn.addEventListener("click", () => {
    infoBox.style.display = "none"
    yt.setAttribute("src", "")
})
let animeName = document.getElementById("animeName")
let animeStatus = document.getElementById("animeStatus")
let animeEpisodes = document.getElementById("animeEpisodes")
let malScore = document.getElementById("malScore")
let malRank = document.getElementById("malRank")
let animeStudio = document.getElementById("animeStudio")
let animeSource = document.getElementById("animeSource")
let animeSynopsis = document.getElementById("animeSynopsis")
let yt = document.getElementById("yt")
let imgLink = document.getElementById("imgLink")