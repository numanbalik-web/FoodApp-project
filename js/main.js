import { uiElements, renderLoader, renderMenuCard, renderNotFound, renderDetailPage } from "./ui.js";
import getMenu from "./api.js";

//ekran yuklenildiginde 
document.addEventListener('DOMContentLoaded',async ()=>{
    const menuData = await getMenu()
    console.log(menuData)

    if (window.location.pathname.includes("/index.html")) {
        renderLoader()
        renderMenuCard(menuData)

        //Kategori tiklanma takibi
        uiElements.categoryButtons.forEach((button) => {

            button.addEventListener("click",()=>{

                const selectedCategory = button.id

                const filteredMenu = menuData.filter(
                    (item) => item.category == selectedCategory
                )

                if (selectedCategory == "all") {
                    renderMenuCard(menuData)
                } else {
                    renderMenuCard(filteredMenu)
                }

            })
        })
    } else {
        const params = new URLSearchParams(window.location.search)
        console.log(params.get("id"))

        const itemId = +params.get("id")

        const product = menuData.find((item) => item.id == itemId)

        if (!product) {
            //hata goster
            renderNotFound()
        } else {
            renderDetailPage(product)
        }
    }
})