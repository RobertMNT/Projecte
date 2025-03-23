async function loadTranslations(language) {
    const response = await fetch(`./traducciones/${language}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        const keys = translationKey.split(".");
        let translation = translations;

        keys.forEach((key) => {
            translation = translation[key];
        });

        // Si la traducción tiene un conteo dinámico (ejemplo: "{count}")
        if (translation.includes("{count}")) {
            const comicsCount = element.getAttribute("data-comics");
            element.innerHTML = translation.replace("{count}", comicsCount);
        } else {
            element.innerHTML = translation;
        }
    });

    // Cambiar placeholder dinámico
    const searchInput = document.querySelector("#buscador");
    searchInput.setAttribute("placeholder", translations.search.placeholder);
}

// Inicializar idioma por defecto y cambiar cuando seleccionas otro
document.getElementById("language-selector").addEventListener("change", (e) => {
    loadTranslations(e.target.value);
});
loadTranslations("es");

