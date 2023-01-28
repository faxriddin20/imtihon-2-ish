// Html elements //
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const informations = document.querySelector("#informations")

function renderInformations(){
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let result = evt.target[0].value;
        if (result) {
            (async () => {
                try {
                    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${result}`)
                    let data = await response.json();
                    console.log(data);
                    const { phonetic } = data[0]
                    informations.innerHTML = "";
                    informations.innerHTML += `<div class="d-flex gap-3">
                    <p class="display-4 fw-normal">${result} -</p>  
                    <p class="display-4 fw-normal">${phonetic.slice(1, -1)}</p>
                    </div>
                    <p>${data[0].meanings[0].definitions[0].definition}</p>
                    <p><em class="example fw-bold"></em></p>
                    <p>"${data[0].meanings[0].definitions[1].definition}"</p>
                    <p>"${data[0].meanings[0].definitions[2].definition}"</p>
                    <p>"${data[0].meanings[0].definitions[3].definition}"</p>
                    <a href="${data[0].meanings[0].definitions[1].definition}"></a>
                    `
                    if (data[0].meanings[0].definitions[0].example) {
                        const example = document.querySelector(".example")
                        example.innerHTML = "";
                        example.innerHTML += "Example:  " + data[0].meanings[0].definitions[0].example
                    }
                    if (data[0].phonetics[0].audio) {
                        informations.innerHTML += `<audio controls src="${data[0].phonetics[0].audio}"></audio>`
                    }
                } catch (err) { console.error(err)}
            })()
        } else {
            informations.innerHTML = ""
            informations.innerHTML += `<p class="text-center">Siz Hech Qanday Ma'lumot Yozmadingiz</p>`
        }
    })
}
